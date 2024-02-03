import { useSelectThemeMode } from "@hiatus/hooks/useSelectThemeMode"

export const Timeline: React.FC<{ username: string }> = ({ username }) => {
  const selectThemeMode = useSelectThemeMode()
  console.log("selectThemeMode", selectThemeMode)

  return (
    <div className="p-3">
      <a
        className="twitter-timeline"
        href={`https://twitter.com/${username.replace(/^@/, "")}?ref_src=twsrc%5Etfw`}
        data-theme={selectThemeMode}
        data-width="400"
        data-height="600"
      >
        Tweets by {username}
      </a>
      <script async src="https://platform.twitter.com/widgets.js"></script>
    </div>
  )
}
