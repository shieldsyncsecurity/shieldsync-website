/**
 * SchemaOrg — renders one or more JSON-LD <script> tags.
 * Use inside any Server Component (layout, page).
 *
 * Usage:
 *   <SchemaOrg schema={organizationSchema()} />
 *   <SchemaOrg schema={[webPageSchema({...}), breadcrumbSchema(...)]} />
 */
export function SchemaOrg({ schema }: { schema: object | object[] }) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: safe — server-generated schema only.
          // Escape "<" so a stray "</script>" in any string can't break out of the tag (XSS hardening).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
