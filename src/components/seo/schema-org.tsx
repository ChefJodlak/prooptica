import {
  generateHomePageSchemaGraph,
  generateLocationsPageSchemaGraph,
  generateEyeExamPageSchemaGraph,
  generateAboutPageSchemaGraph,
  generateContactPageSchemaGraph,
  generateBrandsPageSchemaGraph,
  generateArticlesPageSchemaGraph,
  generateBookingPageSchemaGraph,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/schema";

// Generic schema wrapper component
interface SchemaScriptProps {
  schema: object;
  id?: string;
}

function SchemaScript({ schema, id }: SchemaScriptProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Page-specific schema components
export function HomePageSchema() {
  return <SchemaScript schema={generateHomePageSchemaGraph()} id="homepage-schema" />;
}

export function LocationsPageSchema() {
  return <SchemaScript schema={generateLocationsPageSchemaGraph()} id="locations-schema" />;
}

export function EyeExamPageSchema() {
  return <SchemaScript schema={generateEyeExamPageSchemaGraph()} id="eyeexam-schema" />;
}

export function AboutPageSchema() {
  return <SchemaScript schema={generateAboutPageSchemaGraph()} id="about-schema" />;
}

export function ContactPageSchema() {
  return <SchemaScript schema={generateContactPageSchemaGraph()} id="contact-schema" />;
}

export function BrandsPageSchema() {
  return <SchemaScript schema={generateBrandsPageSchemaGraph()} id="brands-schema" />;
}

export function ArticlesPageSchema() {
  return <SchemaScript schema={generateArticlesPageSchemaGraph()} id="articles-schema" />;
}

export function BookingPageSchema() {
  return <SchemaScript schema={generateBookingPageSchemaGraph()} id="booking-schema" />;
}

// Dynamic article schema
interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  category?: string;
  tags?: string[];
}

export function ArticleSchema(props: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    ...generateArticleSchema(props),
  };
  return <SchemaScript schema={schema} id={`article-${props.slug}-schema`} />;
}

// Dynamic breadcrumb schema
interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    ...generateBreadcrumbSchema(items),
  };
  return <SchemaScript schema={schema} id="breadcrumb-schema" />;
}

// Legacy export for backwards compatibility
export function SchemaOrg() {
  return <HomePageSchema />;
}
