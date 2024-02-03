import { useTranslation } from "next-i18next"

export const OfficialSiteLink: React.FC<{ officialSiteUrl: string; linkText: string }> = ({
  officialSiteUrl,
  linkText,
}) => {
  const { t } = useTranslation("common")
  return (
    <a
      href={t(officialSiteUrl)}
      className="text-blue-500 no-underline hover:underline m-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t(linkText)}
    </a>
  )
}
