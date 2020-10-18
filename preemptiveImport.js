export function preemptiveImport(arg) {
    const linkTagId = arg[0];
    if (linkTagId !== undefined) {
        const linkTag = self[linkTagId];
        if (linkTag === undefined) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', e => {
                    preemptiveImport(arg);
                });
                return;
            }
        }
        else {
            if (linkTag.localName === 'link') { //security precaution
                if (linkTag.dataset.loaded === 'true') {
                    return;
                }
                //TODO:  dry
                switch (linkTag.rel) {
                    case 'modulelazyload':
                    case 'modulepreload': {
                        const scriptTag = document.createElement('script');
                        scriptTag.type = 'module';
                        scriptTag.integrity = linkTag.integrity;
                        scriptTag.src = linkTag.href;
                        scriptTag.crossOrigin = linkTag.crossOrigin;
                        document.head.appendChild(scriptTag);
                        linkTag.dataset.loaded = 'true';
                        return;
                    }
                    case 'lazyload':
                    case 'preload': {
                        switch (linkTag.as) {
                            case 'script': {
                                const scriptTag = document.createElement('script');
                                scriptTag.integrity = linkTag.integrity;
                                scriptTag.crossOrigin = linkTag.crossOrigin;
                                scriptTag.src = linkTag.href;
                                document.head.appendChild(scriptTag);
                                linkTag.dataset.loaded = 'true';
                                return;
                            }
                            case 'style': {
                                const styleTag = document.createElement('link');
                                styleTag.rel = 'stylesheet';
                                styleTag.integrity = linkTag.integrity;
                                styleTag.crossOrigin = linkTag.crossOrigin;
                                styleTag.href = linkTag.href;
                                document.head.appendChild(styleTag);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    //No go for linkTag, try importmap.
    const dynamicImport = arg[1];
    if (dynamicImport !== undefined) {
        try {
            dynamicImport();
            return;
        }
        catch (e) { }
    }
    //No luck with importMap, try CDN
    const CDNPath = arg[2];
    if (CDNPath !== undefined) {
        import(CDNPath);
    }
}
