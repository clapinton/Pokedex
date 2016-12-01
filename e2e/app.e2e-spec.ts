import { AngularPokedexPage } from './app.po';

describe('angular-pokedex App', function() {
  let page: AngularPokedexPage;

  beforeEach(() => {
    page = new AngularPokedexPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
