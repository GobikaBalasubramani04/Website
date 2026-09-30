import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const role = formData.get('role')?.toString() || '';
    const linkedin = formData.get('linkedin')?.toString() || '';
    const portfolio = formData.get('portfolio')?.toString() || '';

    const resume = formData.get('resume');

    // Basic validation
    if (!name || !email || !role) {
      return new Response(
        JSON.stringify({
          error: 'Name, email and role are required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (!(resume instanceof File)) {
      return new Response(
        JSON.stringify({
          error: 'Resume file is required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Create a unique file name
    const fileName = `${Date.now()}-${resume.name}`;

    // Upload resume to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, resume, {
        contentType: resume.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Resume upload error:', uploadError);

      return new Response(
        JSON.stringify({
          error: 'Failed to upload resume',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Store applicant details in database
    const { error: databaseError } = await supabase
      .from('applicants')
      .insert({
        name,
        email,
        phone,
        role,
        linkedin,
        portfolio,
        resume_url: fileName,
      });

    if (databaseError) {
      console.error('Database insert error:', databaseError);

      return new Response(
        JSON.stringify({
          error: 'Failed to save applicant details',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Application submitted successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Application error:', error);

    return new Response(
      JSON.stringify({
        error: 'Something went wrong',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};