//backend.test.cjs
import { expect } from 'chai';
import { fToC } from '../index.js'; 

describe('Конвертация температуры', () => {
  it('должна конвертировать Фаренгейт в Цельсий', () => {
    expect(fToC(32)).to.equal(0);
    expect(fToC(50)).to.equal(10);
    expect(fToC(68)).to.equal(20);
  });
});
