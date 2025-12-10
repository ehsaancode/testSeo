import { useEffect, useRef } from "react";

const QSeo = ({
    site_name,
    page_favicon,
    page_name,
    page_title,
    page_description,
    page_image,
    page_keyword,
    canonical_url,
}) => {
    const metaTagsRef = useRef([]);

    useEffect(() => {
        // Cleanup function: Only remove tags that were dynamically created
        // We do NOT remove tags that were found existing (static tags)
        const cleanup = () => {
            metaTagsRef.current.forEach((tag) => {
                if (tag && tag.parentNode) {
                    tag.parentNode.removeChild(tag);
                }
            });
            metaTagsRef.current = [];
        };

        cleanup(); // Cleanup previous effect's tags if any (though usually runs on unmount/update)

        // Update Title
        if (page_title) {
            document.title = page_title;
        }

        const head = document.head;

        // Helper to update or create meta tags
        const updateOrCreateMeta = (selector, content, createFn) => {
            if (!content) return;

            let element = document.querySelector(selector);
            if (element) {
                // If exists, just update content. Do NOT add to metaTagsRef so we don't remove it.
                element.setAttribute("content", content);
            } else {
                // If not exists, create and track it
                element = createFn();
                if (element) {
                    head.insertBefore(element, head.firstChild);
                    metaTagsRef.current.push(element);
                }
            }
        };

        // Helper for link tags (href instead of content)
        const updateOrCreateLink = (selector, href, rel) => {
            if (!href) return;

            let element = document.querySelector(selector);
            if (element) {
                element.setAttribute("href", href);
            } else {
                element = document.createElement("link");
                element.setAttribute("rel", rel);
                element.setAttribute("href", href);
                head.insertBefore(element, head.firstChild);
                metaTagsRef.current.push(element);
            }
        };

        // Standard QSeo
        updateOrCreateMeta('meta[name="description"]', page_description, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            meta.setAttribute("content", page_description);
            return meta;
        });

        updateOrCreateMeta('meta[name="keywords"]', page_keyword, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("name", "keywords");
            meta.setAttribute("content", page_keyword);
            return meta;
        });

        updateOrCreateLink('link[rel="icon"]', page_favicon, "icon");

        // Open Graph / Facebook
        updateOrCreateMeta('meta[property="og:type"]', "website", () => {
            const meta = document.createElement("meta");
            meta.setAttribute("property", "og:type");
            meta.setAttribute("content", "website");
            return meta;
        });

        updateOrCreateMeta('meta[property="og:image"]', page_image, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("property", "og:image");
            meta.setAttribute("content", page_image);
            return meta;
        });

        updateOrCreateMeta('meta[property="og:site_name"]', site_name, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("property", "og:site_name");
            meta.setAttribute("content", site_name);
            return meta;
        });

        if (page_title) {
            updateOrCreateMeta('meta[property="og:title"]', page_title, () => {
                const meta = document.createElement("meta");
                meta.setAttribute("property", "og:title");
                meta.setAttribute("content", page_title);
                return meta;
            });
        }

        updateOrCreateMeta('meta[property="og:description"]', page_description, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("property", "og:description");
            meta.setAttribute("content", page_description);
            return meta;
        });

        // Canonical & OG URL
        if (canonical_url) {
            updateOrCreateMeta('meta[property="og:url"]', canonical_url, () => {
                const meta = document.createElement("meta");
                meta.setAttribute("property", "og:url");
                meta.setAttribute("content", canonical_url);
                return meta;
            });

            updateOrCreateLink('link[rel="canonical"]', canonical_url, "canonical");
        }

        // Twitter
        updateOrCreateMeta('meta[name="twitter:card"]', "summary_large_image", () => {
            const meta = document.createElement("meta");
            meta.setAttribute("name", "twitter:card");
            meta.setAttribute("content", "summary_large_image");
            return meta;
        });

        updateOrCreateMeta('meta[name="twitter:title"]', page_title, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("name", "twitter:title");
            meta.setAttribute("content", page_title);
            return meta;
        });

        updateOrCreateMeta('meta[name="twitter:description"]', page_description, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("name", "twitter:description");
            meta.setAttribute("content", page_description);
            return meta;
        });

        updateOrCreateMeta('meta[name="twitter:image"]', page_image, () => {
            const meta = document.createElement("meta");
            meta.setAttribute("name", "twitter:image");
            meta.setAttribute("content", page_image);
            return meta;
        });

        return cleanup;
    }, [
        site_name,
        page_favicon,
        page_name,
        page_title,
        page_description,
        page_image,
        page_keyword,
        canonical_url,
    ]);

    return null;
};

export default QSeo;
QSeo.displayName = "QSeo";
