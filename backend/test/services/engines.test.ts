import app from '../../src/app';

describe('\'engines\' service', () => {
  it('registered the service', () => {
    const service = app.service('engines');
    expect(service).toBeTruthy();
  });
});
