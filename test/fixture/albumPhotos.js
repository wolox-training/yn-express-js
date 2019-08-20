const albumPhotos = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952'
};

const albumsPhotos = [{ ...albumPhotos }, { ...albumPhotos, title: 'ejemplo' }];

module.exports = {
  single: albumPhotos,
  all: albumsPhotos
};
