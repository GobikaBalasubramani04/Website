import type { APIRoute } from 'astro';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('resume');

    if (!(file instanceof File)) {
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

    const buffer = Buffer.from(await file.arrayBuffer());

    let text = '';

    // =========================
    // PDF
    // =========================
    if (file.type === 'application/pdf') {
      const parser = new PDFParse({
        data: buffer,
      });

      const result = await parser.getText();

      text = result.text;
    }

    // =========================
    // DOCX
    // =========================
    else if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({
        buffer,
      });

      text = result.value;
    }

    // =========================
    // UNSUPPORTED FILE
    // =========================
    else {
      return new Response(
        JSON.stringify({
          error: 'Only PDF and DOCX files are supported',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // =========================
    // EMAIL
    // =========================
    const emailMatch = text.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );

    // =========================
    // PHONE
    // =========================
    const phoneMatch = text.match(
      /(?:\+91[\s-]?)?[6-9]\d{9}/
    );

    // =========================
    // LINKEDIN
    // =========================
    const linkedinMatch = text.match(
      /https?:\/\/(?:www\.)?linkedin\.com\/[^\s]+/i
    );

    // =========================
    // PORTFOLIO / GITHUB
    // =========================
    const portfolioMatch = text.match(
      /https?:\/\/(?:www\.)?(?!linkedin\.com)[\w.-]+\.[a-z]{2,}(?:\/[^\s]*)?/i
    );

    // =========================
    // CLEAN RESUME LINES
    // =========================
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    console.log(
      'FIRST 15 RESUME LINES:',
      lines.slice(0, 15)
    );

    // =========================
    // NAME DETECTION
    // =========================

    const excludedHeadings = [
      'resume',
      'curriculum vitae',
      'achievements',
      'education',
      'experience',
      'work experience',
      'professional experience',
      'skills',
      'technical skills',
      'technical skill',
      'programming skills',
      'programming languages',
      'soft skills',
      'languages',
      'projects',
      'certifications',
      'certification badges',
      'certificates',
      'summary',
      'objectives',
      'objective',
      'contact',
      'declaration',
      'interests',
      'hobbies',
      'references',
      'personal information',
      'personal profile',
      'profile',
      'career objective',
      'extracurricular activities',
    ];

    const nameCandidates = lines
      .slice(0, 15)
      .map((line) => {
        /*
         * Sometimes PDF extraction puts the person's name
         * and another heading on the same line.
         *
         * Example:
         *GOBIKA B    CERTIFICATION BADGES
         *
         * We take only the part before the tab.
         */
        return line.split('\t')[0].trim();
      })
      .filter((line) => {
        const normalized = line
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();

        const compact = normalized.replace(/[^a-z]/g, '');

        // Reject spaced-out headings like:
        // A C H I E V E M E N T S
        const isSpacedHeading =
          /^(?:[A-Za-z]\s+){3,}[A-Za-z]$/.test(line);

        // Basic person-name pattern
        const looksLikeName =
          /^[A-Za-z]+(?:[ .'-][A-Za-z]+)+$/.test(line) &&
          line.length >= 3 &&
          line.length <= 50;

        // Known resume headings
        const looksLikeHeading =
          excludedHeadings.includes(normalized);

        // Education-related text
        const looksLikeEducation =
          normalized.includes('school') ||
          normalized.includes('college') ||
          normalized.includes('university') ||
          normalized.includes('institute') ||
          normalized.includes('academy') ||
          normalized.includes('matric') ||
          normalized.includes('higher secondary') ||
          normalized.includes('secondary school') ||
          normalized.includes('degree');

        // Contact-related text
        const looksLikeContact =
          normalized.includes('@') ||
          normalized.includes('linkedin') ||
          normalized.includes('github') ||
          normalized.includes('http') ||
          normalized.includes('phone') ||
          normalized.includes('mobile') ||
          normalized.includes('email');

        return (
          looksLikeName &&
          compact.length >= 4 &&
          !isSpacedHeading &&
          !looksLikeHeading &&
          !looksLikeEducation &&
          !looksLikeContact
        );
      });

    const name = nameCandidates[0] || '';

    console.log('DETECTED NAME:', name);

    // =========================
    // RESPONSE
    // =========================
    return new Response(
      JSON.stringify({
        name,
        email: emailMatch?.[0] || '',
        phone: phoneMatch?.[0] || '',
        linkedin: linkedinMatch?.[0] || '',
        portfolio: portfolioMatch?.[0] || '',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Resume parsing error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to parse resume',
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