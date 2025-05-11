import { HarProperty, PropertyMedia } from ".";
import { MemberLookUp } from "./member-look-up";

export interface Property extends HarProperty{
  propertyMedia: PropertyMedia [];
}
