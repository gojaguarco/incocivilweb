/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type Config = {
  _id: string;
  _type: "config";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  contactLink: string;
  information: {
    email: string;
    phone: number;
    address?: string;
    city: string;
    country: string;
  };
  socialLinks: Array<{
    redSocial: "facebook" | "X" | "WhatsApp" | "Instagram" | "linkedIn" | "YouTube" | "TikTok" | "Otra";
    url: string;
    _type: "link";
    _key: string;
  }>;
};

export type Project = {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  descriptionText: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
  };
  body: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
    _key: string;
  } | {
    video: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
      };
      _type: "file";
    };
    imagenDeCarga: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    _type: "video";
    _key: string;
  }>;
};

export type ProjectSection = {
  _id: string;
  _type: "projectSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titleDescription?: string;
  title: string;
  ctaButton1: Button;
  projects: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "project";
  }>;
};

export type ProjectContactSection = {
  _id: string;
  _type: "projectContactSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titleDescription?: string;
  title: string;
  imageObject: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
};

export type AboutHeroSection = {
  _id: string;
  _type: "aboutHeroSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titleDescription: string;
  title1: string;
  title2: string;
  highlightedTitle: string;
  descriptionText: string;
  ImageOrVideo: {
    imagenOVideo?: boolean;
    imagen?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    video?: VideoObject;
  };
};

export type ImageSection = {
  _id: string;
  _type: "imageSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  sectionName?: string;
  descriptionText: string;
  ctaButton1: Button;
  ctaButton2?: Button;
  ImageOrVideo: {
    imagenOVideo?: boolean;
    imagen?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    video?: VideoObject;
  };
};

export type WhatwedoSection = {
  _id: string;
  _type: "whatwedoSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  sectionName: string;
  descriptionText: string;
  ctaButton: Button;
  imageArray: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
    _key: string;
  }>;
};

export type ContactSection = {
  _id: string;
  _type: "contactSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  sectionName: string;
  imageObject: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
  homeProject: {
    text: string;
    ctaButton: Button;
  };
  comercialProject: {
    text: string;
    ctaButton: Button;
  };
  contactCard: {
    title: string;
    description: string;
    ctaButton: Button;
  };
};

export type Faq = {
  _id: string;
  _type: "faq";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  question: string;
  answer: string;
};

export type FaqSection = {
  _id: string;
  _type: "faqSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  sectionName: string;
  sectionDescription: string;
  imageObject: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
  faqs: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "faq";
  }>;
};

export type SurfaceSliderSection = {
  _id: string;
  _type: "surfaceSliderSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  sectionName: string;
  sectionDescription: string;
  surfaceList: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "surface";
  }>;
};

export type ImageOrVideo = {
  _type: "ImageOrVideo";
  imagenOVideo?: boolean;
  imagen?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
  };
  video?: VideoObject;
};

export type WhyusSection = {
  _id: string;
  _type: "whyusSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  sectionName: string;
  ImageOrVideo: {
    imagenOVideo?: boolean;
    imagen?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    video?: VideoObject;
  };
  benefits: Array<{
    title: string;
    description: string;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    _type: "benefit";
    _key: string;
  }>;
  ctaButton: Button;
};

export type SecondaryService = {
  _id: string;
  _type: "secondaryService";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description: string;
  imageObject: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
  reference: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "service";
  };
};

export type Service = {
  _id: string;
  _type: "service";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  descriptionText: string;
  ImageOrVideo: {
    imagenOVideo?: boolean;
    imagen?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    video?: VideoObject;
  };
  body: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
    _key: string;
  } | {
    video: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
      };
      _type: "file";
    };
    imagenDeCarga: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    _type: "video";
    _key: string;
  }>;
};

export type Surface = {
  _id: string;
  _type: "surface";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description?: string;
  imageObject: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
  type: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "surfaceTypes";
  };
  price?: number;
  code?: number;
};

export type SurfaceTypes = {
  _id: string;
  _type: "surfaceTypes";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
    _key: string;
  } | {
    video: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
      };
      _type: "file";
    };
    imagenDeCarga: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    _type: "video";
    _key: string;
  }>;
  imageObject: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
};

export type ServicesSection = {
  _type: "servicesSection";
  titleDescription: string;
  title: string;
  sectionName: string;
  description: string;
  ctaButton: Button;
  primarySurfaces: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "surfaceTypes";
  }>;
  secondaryServices: Array<{
    title: string;
    description: string;
    imageObject: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
    };
    reference: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "service";
    };
    _type: "secondaryService";
    _key: string;
  }>;
};

export type HomeHeroSection = {
  _id: string;
  _type: "homeHeroSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  simpleTitle: string;
  highlightedTitle: string;
  descriptionCard: {
    descriptionTitle: string;
    projectNumber: number;
    descriptionText: string;
    primaryButton: Button;
    secondaryButton: Button;
  };
  expertiseCard: {
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    title: string;
    description: string;
    ctaButton: Button;
  };
};

export type Pages = {
  _id: string;
  _type: "pages";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  homePage: Array<{
    simpleTitle: string;
    highlightedTitle: string;
    descriptionCard: {
      descriptionTitle: string;
      projectNumber: number;
      descriptionText: string;
      primaryButton: Button;
      secondaryButton: Button;
    };
    expertiseCard: {
      image: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      title: string;
      description: string;
      ctaButton: Button;
    };
    _type: "homeHeroSection";
    _key: string;
  } | {
    _key: string;
  } & ServicesSection | {
    title: string;
    sectionName: string;
    ImageOrVideo: {
      imagenOVideo?: boolean;
      imagen?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      video?: VideoObject;
    };
    benefits: Array<{
      title: string;
      description: string;
      image: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      _type: "benefit";
      _key: string;
    }>;
    ctaButton: Button;
    _type: "whyusSection";
    _key: string;
  } | {
    title: string;
    sectionName: string;
    sectionDescription: string;
    surfaceList: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "surface";
    }>;
    _type: "surfaceSliderSection";
    _key: string;
  } | {
    title: string;
    sectionName: string;
    sectionDescription: string;
    imageObject: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
    };
    faqs: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "faq";
    }>;
    _type: "faqSection";
    _key: string;
  } | {
    title: string;
    sectionName: string;
    imageObject: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
    };
    homeProject: {
      text: string;
      ctaButton: Button;
    };
    comercialProject: {
      text: string;
      ctaButton: Button;
    };
    contactCard: {
      title: string;
      description: string;
      ctaButton: Button;
    };
    _type: "contactSection";
    _key: string;
  }>;
  aboutPage: Array<{
    titleDescription: string;
    title1: string;
    title2: string;
    highlightedTitle: string;
    descriptionText: string;
    ImageOrVideo: {
      imagenOVideo?: boolean;
      imagen?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      video?: VideoObject;
    };
    _type: "aboutHeroSection";
    _key: string;
  } | {
    title: string;
    sectionName: string;
    descriptionText: string;
    ctaButton: Button;
    imageArray: Array<{
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
      _key: string;
    }>;
    _type: "whatwedoSection";
    _key: string;
  } | {
    title: string;
    sectionName?: string;
    descriptionText: string;
    ctaButton1: Button;
    ctaButton2?: Button;
    ImageOrVideo: {
      imagenOVideo?: boolean;
      imagen?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      video?: VideoObject;
    };
    _type: "imageSection";
    _key: string;
  }>;
  projectsPage: Array<{
    titleDescription?: string;
    title: string;
    ctaButton1: Button;
    projects: Array<{
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      _key: string;
      [internalGroqTypeReferenceTo]?: "project";
    }>;
    _type: "projectSection";
    _key: string;
  } | {
    titleDescription?: string;
    title: string;
    imageObject: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
    };
    _type: "projectContactSection";
    _key: string;
  }>;
};

export type VideoObject = {
  _type: "videoObject";
  video: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    };
    _type: "file";
  };
  imagenDeCarga: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
  };
};

export type Button = {
  _type: "button";
  text: string;
  color: "naranja" | "amarillo" | "claro" | "oscuro";
  size: "peque\xF1o" | "mediano" | "grande";
  link: string;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
  };
  categories: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  publishedAt?: string;
  body: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
    _key: string;
  } | {
    video: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
      };
      _type: "file";
    };
    imagenDeCarga: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    _type: "video";
    _key: string;
  }>;
};

export type Category = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: string;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  markDefs?: Array<{
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt: string;
  _type: "imageObject";
  _key: string;
} | {
  video: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    };
    _type: "file";
  };
  imagenDeCarga: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
  };
  _type: "video";
  _key: string;
}>;

export type ImageObject = {
  _type: "imageObject";
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt: string;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | Geopoint | Slug | Config | Project | ProjectSection | ProjectContactSection | AboutHeroSection | ImageSection | WhatwedoSection | ContactSection | Faq | FaqSection | SurfaceSliderSection | ImageOrVideo | WhyusSection | SecondaryService | Service | Surface | SurfaceTypes | ServicesSection | HomeHeroSection | Pages | VideoObject | Button | Post | Category | BlockContent | ImageObject | SanityFileAsset | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/queries/blogQueries.ts
// Variable: BLOGS_QUERY
// Query: *[_type == "post" ][0...12]{  _id, title, description, image}
export type BLOGS_QUERYResult = Array<{
  _id: string;
  title: string;
  description: string;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
  };
}>;
// Variable: BLOG_QUERY
// Query: *[_type == "post" && _id == $id][0]{  title, description, body, image, categories, publishedAt}
export type BLOG_QUERYResult = {
  title: string;
  description: string;
  body: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
    _key: string;
  } | {
    video: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
      };
      _type: "file";
    };
    imagenDeCarga: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "imageObject";
    };
    _type: "video";
    _key: string;
  }>;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "imageObject";
  };
  categories: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "category";
  }>;
  publishedAt: string | null;
} | null;

// Source: ./sanity/queries/homeQueries.ts
// Variable: HOMEPAGE_QUERY
// Query: *[_type == 'pages'][0]{  homePage[] {    ...,    primarySurfaces[]->,    surfaceList[]->,    faqs []->,  }}
export type HOMEPAGE_QUERYResult = {
  homePage: Array<{
    title: string;
    sectionName: string;
    imageObject: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
    };
    homeProject: {
      text: string;
      ctaButton: Button;
    };
    comercialProject: {
      text: string;
      ctaButton: Button;
    };
    contactCard: {
      title: string;
      description: string;
      ctaButton: Button;
    };
    _type: "contactSection";
    _key: string;
    primarySurfaces: null;
    surfaceList: null;
    faqs: null;
  } | {
    title: string;
    sectionName: string;
    sectionDescription: string;
    imageObject: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt: string;
      _type: "image";
    };
    faqs: Array<{
      _id: string;
      _type: "faq";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      question: string;
      answer: string;
    }>;
    _type: "faqSection";
    _key: string;
    primarySurfaces: null;
    surfaceList: null;
  } | {
    simpleTitle: string;
    highlightedTitle: string;
    descriptionCard: {
      descriptionTitle: string;
      projectNumber: number;
      descriptionText: string;
      primaryButton: Button;
      secondaryButton: Button;
    };
    expertiseCard: {
      image: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      title: string;
      description: string;
      ctaButton: Button;
    };
    _type: "homeHeroSection";
    _key: string;
    primarySurfaces: null;
    surfaceList: null;
    faqs: null;
  } | {
    _key: string;
    _type: "servicesSection";
    titleDescription: string;
    title: string;
    sectionName: string;
    description: string;
    ctaButton: Button;
    primarySurfaces: Array<{
      _id: string;
      _type: "surfaceTypes";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      title: string;
      description: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
        listItem?: "bullet";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      } | {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
        _key: string;
      } | {
        video: {
          asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
          };
          _type: "file";
        };
        imagenDeCarga: {
          asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
          };
          hotspot?: SanityImageHotspot;
          crop?: SanityImageCrop;
          alt: string;
          _type: "imageObject";
        };
        _type: "video";
        _key: string;
      }>;
      imageObject: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "image";
      };
    }>;
    secondaryServices: Array<{
      title: string;
      description: string;
      imageObject: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "image";
      };
      reference: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "service";
      };
      _type: "secondaryService";
      _key: string;
    }>;
    surfaceList: null;
    faqs: null;
  } | {
    title: string;
    sectionName: string;
    sectionDescription: string;
    surfaceList: Array<{
      _id: string;
      _type: "surface";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      title: string;
      description?: string;
      imageObject: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "image";
      };
      type: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "surfaceTypes";
      };
      price?: number;
      code?: number;
    }>;
    _type: "surfaceSliderSection";
    _key: string;
    primarySurfaces: null;
    faqs: null;
  } | {
    title: string;
    sectionName: string;
    ImageOrVideo: {
      imagenOVideo?: boolean;
      imagen?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      video?: VideoObject;
    };
    benefits: Array<{
      title: string;
      description: string;
      image: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt: string;
        _type: "imageObject";
      };
      _type: "benefit";
      _key: string;
    }>;
    ctaButton: Button;
    _type: "whyusSection";
    _key: string;
    primarySurfaces: null;
    surfaceList: null;
    faqs: null;
  }>;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"post\" ][0...12]{\n  _id, title, description, image\n}": BLOGS_QUERYResult;
    "*[_type == \"post\" && _id == $id][0]{\n  title, description, body, image, categories, publishedAt\n}": BLOG_QUERYResult;
    "*[_type == 'pages'][0]{\n  homePage[] {\n    ...,\n    primarySurfaces[]->,\n    surfaceList[]->,\n    faqs []->,\n  }\n}": HOMEPAGE_QUERYResult;
  }
}