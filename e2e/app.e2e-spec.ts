import { WsFrontendPage } from './app.po';

describe('ws-frontend App', function() {
  let page: WsFrontendPage;

  beforeEach(() => {
    page = new WsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
