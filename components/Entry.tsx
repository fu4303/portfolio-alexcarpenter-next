import Link from 'next/link';
import Image from 'next/image';
import { formatDate, widont } from '@/lib/utils';
import Tags from '@/components/Tags';

interface EntryProps {
  image?: {
    src: string;
    alt: string;
  };
  date: string;
  title: string;
  description?: string;
  tags?: string[];
  link?: string;
}

export default function Entry({
  image,
  date,
  title,
  description,
  tags,
  link,
}: EntryProps) {
  const CustomLink = ({ href, children }) => {
    const isInternalLink =
      href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
        <Link href={href}>
          <a className="underline hover:no-underline focus:no-underline">
            {children}
          </a>
        </Link>
      );
    }

    return (
      <>
        <a
          className="underline hover:no-underline focus:no-underline"
          target="_blank"
          rel="noopener noreferrer"
          href={link}
        >
          {children}
        </a>
        <span className="text-white text-opacity-75">&nbsp;&#8594;</span>
      </>
    );
  };
  return (
    <div className="flex flex-col sm:flex-row flex-wrap">
      {image && (
        <div className="w-full mb-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={450}
            className="rounded-md"
          />
        </div>
      )}
      <div className="w-28 flex-shrink-0">
        <time
          className="text-white text-opacity-75 mb-2 inline-block"
          dateTime={date}
        >
          {formatDate(date)}
        </time>
      </div>
      <div className="flex-1">
        <h2>
          {link ? (
            <CustomLink href={link}>{widont(title)}</CustomLink>
          ) : (
            <>{title}</>
          )}
        </h2>
        {link && (
          <p className="mt-0.5 text-sm text-white text-opacity-75">
            {new URL(link).hostname}
          </p>
        )}
        {description && (
          <p className="mt-2 text-white text-opacity-75">{description}</p>
        )}
        {tags && <Tags items={tags} />}
      </div>
    </div>
  );
}
