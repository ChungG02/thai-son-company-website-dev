/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
	mediaId: string;
	alt?: string;
	url?: string;
}

export interface BlogSiteIdentitySettings {
	title?: string;
	tagline?: string;
	logo?: MediaReference;
	favicon?: MediaReference;
}

const DEFAULT_SITE_TITLE = "Thái Sơn Plastic";
const DEFAULT_SITE_TAGLINE = "Giải pháp đóng gói công nghiệp";

const STARTER_TITLES = new Set(["", "My Blog", "EmDash Website", "THÁI SƠN"]);
const STARTER_TAGLINES = new Set([
	"",
	"Thoughts, stories, and ideas.",
	"Thoughts on building for the web",
]);

export function resolveBlogSiteIdentity(settings?: BlogSiteIdentitySettings) {
	const configuredTitle = settings?.title?.trim() ?? "";
	const configuredTagline = settings?.tagline?.trim() ?? "";

	return {
		siteTitle: STARTER_TITLES.has(configuredTitle)
			? DEFAULT_SITE_TITLE
			: configuredTitle,
		siteTagline: STARTER_TAGLINES.has(configuredTagline)
			? DEFAULT_SITE_TAGLINE
			: configuredTagline,
		siteLogo: settings?.logo?.url ? settings.logo : null,
	};
}
