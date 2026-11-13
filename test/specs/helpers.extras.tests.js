describe('helpers.extras requestAnimFrame', function() {
  const {requestAnimFrame} = Chart.helpers;
  let original;

  beforeEach(function() {
    original = window.requestAnimationFrame;
  });

  afterEach(function() {
    window.requestAnimationFrame = original;
  });

  it('should use the native requestAnimationFrame when available (as in a dedicated worker)', function() {
    const spy = jasmine.createSpy('raf').and.returnValue(42);
    window.requestAnimationFrame = spy;
    const cb = jasmine.createSpy('cb');

    expect(requestAnimFrame(cb)).toBe(42);
    expect(spy).toHaveBeenCalledWith(cb);
    expect(cb).not.toHaveBeenCalled();
  });

  it('should call the native function with window as this', function() {
    let called = false;
    window.requestAnimationFrame = function() {
      called = this === window;
    };
    requestAnimFrame(function() {});
    expect(called).toBe(true);
  });

  it('should fall back to a synchronous call when requestAnimationFrame is missing', function() {
    window.requestAnimationFrame = undefined;
    const cb = jasmine.createSpy('cb');
    expect(function() {
      requestAnimFrame(cb);
    }).not.toThrow();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should schedule asynchronously in the browser', function(done) {
    let called = false;
    requestAnimFrame(function() {
      called = true;
      done();
    });
    expect(called).toBe(false);
  });
});
