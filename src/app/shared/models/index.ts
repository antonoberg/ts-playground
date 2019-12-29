export class Song {
  public title: string
  public id: string

  constructor({ title, id }: { title: string; id: string }) {
    this.title = title
    this.id = id
  }
}

export class Artist {
  public name: string
  public id: string

  constructor({ name, id }: { name: string; id: string }) {
    this.name = name
    this.id = id
  }
}

export class AggregatedArtist extends Artist {
  public songs: Array<Song>

  constructor(input: AggregatedArtist) {
    super(input)
    this.songs = input.songs
  }
}

export class AggregatedSong extends Song {
  public artists: Array<Artist>

  constructor(input: AggregatedSong) {
    super(input)
    this.artists = input.artists
  }
}
