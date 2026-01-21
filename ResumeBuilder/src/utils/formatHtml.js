import DOMPurify from 'dompurify';

export const formatHtml = (html) => {
  return DOMPurify.sanitize(html);
};