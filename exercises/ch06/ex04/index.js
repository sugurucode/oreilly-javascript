var obj = {};
// Define properties with different attribute combinations
Object.defineProperty(obj, 'readOnly', {
    value: 'cannot be modified',
    writable: false,
    enumerable: true,
    configurable: true,
});
Object.defineProperty(obj, 'hidden', {
    value: 'not enumerable',
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(obj, 'locked', {
    value: 'cannot be deleted',
    writable: true,
    enumerable: true,
    configurable: false,
});
// Test property modification
console.log('\n--- Testing property modification ---');
console.log('Initial readOnly value:', obj.readOnly);
try {
    obj.readOnly = 'trying to modify';
    console.log('Modified readOnly value:', obj.readOnly);
}
catch (e) {
    if (e instanceof Error) {
        console.log('Error modifying readOnly:', e.message);
    }
}
console.log('\nInitial hidden value:', obj.hidden);
obj.hidden = 'modified hidden';
console.log('Modified hidden value:', obj.hidden);
// Test property enumeration
console.log('\n--- Testing property enumeration ---');
console.log('Object.keys(obj):', Object.keys(obj));
console.log('for...in loop results:');
for (var key in obj) {
    console.log(key);
}
// Test hasOwnProperty and propertyIsEnumerable
console.log('\n--- Testing property checks ---');
console.log('hasOwnProperty results:');
console.log('readOnly:', Object.prototype.hasOwnProperty.call(obj, 'readOnly'));
console.log('hidden:', Object.prototype.hasOwnProperty.call(obj, 'hidden'));
console.log('locked:', Object.prototype.hasOwnProperty.call(obj, 'locked'));
console.log('\npropertyIsEnumerable results:');
console.log('readOnly:', Object.prototype.propertyIsEnumerable.call(obj, 'readOnly'));
console.log('hidden:', Object.prototype.propertyIsEnumerable.call(obj, 'hidden'));
console.log('locked:', Object.prototype.propertyIsEnumerable.call(obj, 'locked'));
// Test property deletion
console.log('\n--- Testing property deletion ---');
console.log('Trying to delete properties:');
try {
    delete obj.readOnly;
    console.log('readOnly deleted:', !Object.prototype.hasOwnProperty.call(obj, 'readOnly'));
}
catch (e) {
    if (e instanceof Error) {
        console.log('Error deleting readOnly:', e.message);
    }
}
try {
    delete obj.hidden;
    console.log('hidden deleted:', !Object.prototype.hasOwnProperty.call(obj, 'hidden'));
}
catch (e) {
    if (e instanceof Error) {
        console.log('Error deleting hidden:', e.message);
    }
}
try {
    delete obj.locked;
    console.log('locked deleted:', !Object.prototype.hasOwnProperty.call(obj, 'locked'));
}
catch (e) {
    if (e instanceof Error) {
        console.log('Error deleting locked:', e.message);
    }
}
