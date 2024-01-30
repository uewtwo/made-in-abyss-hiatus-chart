export const OfficialSiteLink: React.FC<{ officialSiteUrl: string; linkText: string }> = ({
  officialSiteUrl,
  linkText,
}) => {
  return (
    <a
      href={officialSiteUrl}
      className="text-blue-500 no-underline hover:underline m-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {linkText}
    </a>
  )
}
