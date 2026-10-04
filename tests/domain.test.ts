import { test } from 'node:test';
import assert from 'node:assert/strict';
const domain = await import('../src/features/commerce/domain').catch(() => ({})) as Record<string, Function>;
test('checkout prices come from catalogue, not browser totals', () => {
  assert.equal(typeof domain.priceCart, 'function', 'priceCart is not implemented');
  const result = domain.priceCart([{id:'a',quantity:2,price:1}], [{id:'a',price:12500,stock:5,quoteOnly:false,active:true}]);
  assert.equal(result.subtotal,25000);
});
test('last available unit and quote-only items cannot be oversold', () => {
  assert.equal(typeof domain.priceCart, 'function', 'priceCart is not implemented');
  assert.throws(()=>domain.priceCart([{id:'a',quantity:2}],[{id:'a',price:100,stock:1,quoteOnly:false,active:true}]),/stock/i);
  assert.throws(()=>domain.priceCart([{id:'a',quantity:1}],[{id:'a',price:100,stock:4,quoteOnly:true,active:true}]),/quotation/i);
});
test('invalid and duplicate quantities cannot bypass stock validation', () => {
  assert.equal(typeof domain.priceCart, 'function', 'priceCart is not implemented');
  const products=[{id:'a',price:100,stock:1,quoteOnly:false,active:true}];
  assert.throws(()=>domain.priceCart([{id:'a',quantity:-1}],products),/quantity/i);
  assert.throws(()=>domain.priceCart([{id:'a',quantity:1},{id:'a',quantity:1}],products),/stock/i);
});
test('staff permissions and customer ownership are distinct', () => {
  assert.equal(typeof domain.can, 'function', 'permissions are not implemented');
  assert.equal(domain.can('inventory','stock'),true);
  assert.equal(domain.can('inventory','prices'),false);
  assert.equal(domain.can('customer','stock'),false);
  assert.equal(domain.can('owner','team'),true);
});
test('separate demo customer emails have isolated stable identities', () => {
  assert.equal(typeof domain.demoCustomerId,'function');
  assert.equal(domain.demoCustomerId('customer@example.com'),'demo-customer');
  assert.equal(domain.demoCustomerId(' BUYER@EXAMPLE.COM '),domain.demoCustomerId('buyer@example.com'));
  assert.notEqual(domain.demoCustomerId('buyer@example.com'),domain.demoCustomerId('other@example.com'));
});
