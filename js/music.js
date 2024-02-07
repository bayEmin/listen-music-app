class Music {
    constructor(title, singer, img, file, category) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
        this.category = category;
    }

    getName() {
        return this.title + ' - ' + this.singer;
    }
}

const musicList = [
    new Music('Katmer Katmer', 'LARA', 'lara-katmer-katmer', 'Katmer-Katmer', 'Pop'),
    new Music('Poşet', 'Serdar Ortaç', 'serdar-ortac-poset', 'Poset','Pop'),
    new Music('Sopa', 'Hande Yener', 'hande-yener-sopa', 'Sopa','Pop'),
    new Music('Dönence', 'Barış Manço', 'baris-manco-donence', 'Donence', 'Turkish Rock'),
    new Music('İhtimal', 'Linet', 'linet-ihtimal', 'Ihtimal', 'Arabesk'),
    new Music('Dünyadan Uzak', 'Sakiler', 'sakiler-dunyadan-uzak', 'Dunyadan-Uzak', 'Turkish Rock'),
    new Music('Ayrılık', 'Selda Bağcan', 'selda-bagcan-ayrilik', 'Ayrilik', 'Arabesk')
];
