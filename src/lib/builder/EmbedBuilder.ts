
import { 
  EmbedAuthorOptions, 
  EmbedField, 
  EmbedFooter, 
  EmbedFooterOptions, 
  EmbedImageOptions, 
  EmbedOptions, 
  User 
} from "oceanic.js";
import { Base } from "./Base.js";
import { config } from "#lumine/config/config.js";
import { ColorResolvable } from "#lumine/types";




export class EmbedBuilder extends Base<EmbedOptions> {
  private readonly data: EmbedOptions = {};

  constructor(_data?: EmbedOptions){
    super();
    if(_data) this.data = Object.assign({}, _data);
  }

  get author(): Readonly<EmbedAuthorOptions>|undefined{
    return this.data.author;
  }

  get color(){
    return this.data.color ?? config.colors.main;
  }

  get createdAt(){
    return this.timestamp;
  }

  get description(){
    return this.data.description;
  }

  get fields(): Readonly<EmbedField[]>{
    return this.data.fields ?? [];
  }

  get footer(): Readonly<EmbedFooterOptions>|undefined{
    return this.data.footer;
  }

  get hexColor(){
    if(this.color)return `#${this.color.toString(16)}`;
    else return undefined;
  }

  get image(): Readonly<EmbedImageOptions>|undefined{
    return this.data.image;
  }

  get length(){
    return (
      (this.title?.length ?? 0)
      + (this.description?.length ?? 0)
      + (this.fields && this.fields.length >= 1
        ? this.fields.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0)
        : 0)
      + (this.footer?.text.length ?? 0)
      + (this.author?.name.length ?? 0)
    );
  }

  get thumbnail(): Readonly<EmbedImageOptions>|undefined{
    return this.data.thumbnail;
  }

  get timestamp(): Readonly<string|Date>{
    return this.timestamp;
  }

  get title(){
    return this.data.title;
  }

  addField(name: string, value: string, inline?: boolean){
    (this.data.fields = this.data.fields || []).push({ name, value, inline: !!inline });
    return this;
  }

  addFields(...fields: EmbedField[]){
    (this.data.fields = this.data.fields || []).push(...fields);
    return this;
  }

  equals(embed: EmbedBuilder|EmbedOptions){
    return (
      this.author?.name === embed.author?.name
      && this.author?.url === embed.author?.url
      && this.author?.iconURL === (embed.author?.iconURL ?? embed.author?.iconURL)
      && this.color === embed.color
      && this.title === embed.title
      && this.description === embed.description
      && this.timestamp === embed.timestamp
      && this.fields.length === (embed.fields?.length || 0)
      && (this.fields.length === 0 || this.fields.every((field, i) => {
        const a = field;
        const b = embed.fields?.[i] || undefined;
        return a.name === b?.name && a.value === b.value && !!a.inline === !!b.inline;
      }))
      && this.footer?.text === embed.footer?.text
      && this.footer?.iconURL === embed.footer?.iconURL
      && this.image?.url === embed.image?.url
      && this.thumbnail?.url === embed.thumbnail?.url
    );
  }
  setAuthor(user: User, url?: string): this;
  setAuthor(author: string | EmbedAuthorOptions): this;
  setAuthor(author: string | EmbedAuthorOptions | User, url?: string): this {
    if(!this.data.author) this.data.author = {} as EmbedAuthorOptions;
    if(typeof author === "string"){
      this.data.author.name = author;
    }
    else if (author instanceof User){
      this.data.author = { name: author.username, iconURL: author.avatarURL(), url };
    } else{
      this.data.author.name = author.name;
      this.data.author.url = author.url;
      this.data.author.iconURL = author.iconURL;
    }
    return this;
  }

  setColor(color: ColorResolvable){
    if(typeof color === "number"){
      if(color < 0x0 || 0xffffff < color) throw new Error("invalid color specified");
      this.data.color = color;
    }else{
      if(color.some(colorFragment => colorFragment < 0 || 255 < colorFragment)) throw new Error("invalid color specified");
      this.data.color = (color[0] << 16) + (color[1] << 8) + color[2];
    }
    return this;
  }

  setDescription(description: string){
    this.data.description = description;
    return this;
  }

  setFields(...fields: EmbedField[]){
    this.data.fields = fields;
    return this;
  }

  setFooter(footer: EmbedFooter){
    this.data.footer = footer;
    return this;
  }

  setImage(url: string){
    this.data.image = { url };
    return this;
  }

  setThumbnail(url: string){
    this.data.thumbnail = { url };
    return this;
  }

  setTimestamp(timestamp: Date|number|undefined){
    if(!timestamp){
      // check if timestamp 
      this.data.timestamp = undefined;
      return this;
    }else{
      const date = typeof timestamp === "number" ? new Date(timestamp) : timestamp;
      this.data.timestamp = date.toISOString();
      return this;
    }
  }

  setTitle(title: string){
    this.data.title = title;
    return this;
  }

  setURL(url: string){
    this.data.url = url;
    return this;
  }

  spliceFields(index: number, deleteCount: number, ...fields: EmbedField[]){
    return (this.data.fields || []).splice(index, deleteCount, ...fields);
  }

  toJSON(){
    const result = Object.assign({}, this.data);
    if(this.data.fields) result.fields = this.data.fields.map(field => Object.assign({}, field));
    return result;
  }
}