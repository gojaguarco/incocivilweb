import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './blogTypes/categoryType'
import {postType} from './blogTypes/postType'
import { pagesType } from './pagesType'
import { buttonType } from './buttonType'
import { surfaceType, surfaceTypesType } from './surfacesTypes'
import { secondaryServiceType } from './homeTypes/secondaryServiceType'
import { ImageOrVideoSchema, ImageSchema, VideoSchema } from './generalSchemas'
import { homeHeroSectionType } from './homeTypes/homeHeroSectionType'
import { aboutHeroSectionType } from './aboutTypes/aboutHeroSectionType'
import { servicesSectionType } from './homeTypes/servicesSectionType'
import { whyusSectionType } from './homeTypes/whyusSectionType'
import { surfaceSliderSectionType } from './homeTypes/surfaceSliderSectionType'
import { faqSectionType } from './homeTypes/faqSectionType'
import { faqType } from './faqType'
import { contactSectionType } from './homeTypes/contactSectionType'
import { whatwedoSectionType } from './aboutTypes/whatwedoSectionType'
import { imageSectionType } from './imageSectionType'
import { serviceType } from './serviceType'
import { projectContactSectionType } from './projectTypes/projectContactSectionType'
import { projectSectionType } from './projectTypes/projectSectionType'
import { projectType } from './projectTypes/projectType'
import { configType } from './configType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, pagesType, buttonType, homeHeroSectionType, servicesSectionType, surfaceTypesType, surfaceType, serviceType, secondaryServiceType, whyusSectionType, ImageSchema, VideoSchema, ImageOrVideoSchema, surfaceSliderSectionType, faqSectionType, faqType, contactSectionType, whatwedoSectionType, imageSectionType, aboutHeroSectionType, projectContactSectionType, projectSectionType, projectType, configType],
}
