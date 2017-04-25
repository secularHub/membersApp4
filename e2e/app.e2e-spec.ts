import { MembersAppPage } from './app.po';

describe('members-app App', () => {
  let page: MembersAppPage;

  beforeEach(() => {
    page = new MembersAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
