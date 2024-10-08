export function addHashToTagsString(tags: string): string {
  let arrTags = tags.split(",");

  arrTags = arrTags
    .map((tag) => {
      tag = tag.trim();

      return tag.startsWith("#") ? tag : `#${tag}`;
    })
    .join(", ");

  return arrTags;
}
