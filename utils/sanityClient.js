import imageUrlBuilder from '@sanity/image-url';

const sanityClient = require('@sanity/client');

export const client = sanityClient({
  projectId: 's50dl4gm',
  dataset: 'production',
  useCdn: true,
});

const sanityImageUrl = imageUrlBuilder(client);

export const urlFor = (source) => {
  return sanityImageUrl.image(source)
}
