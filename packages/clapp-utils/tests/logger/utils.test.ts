import { printObject } from '../../src/logger/utils';

describe('printObject', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Spy on console.log and provide a mock implementation
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.log after each test
    consoleSpy.mockRestore();
  });

  it('should print a simple object with default titles', () => {
    const obj = { name: 'John Doe', age: 30 };
    const title = 'User Information';
    printObject(title, obj);

    // Check header and footer
    expect(consoleSpy).toHaveBeenCalledWith(`\n${title}\n---------------------------------------`);
    expect(consoleSpy).toHaveBeenCalledWith(`---------------------------------------\n`);

    // Check formatted rows
    // "Name" and "Age" have the same length, so padding is consistent
    expect(consoleSpy).toHaveBeenCalledWith('Name : John Doe');
    expect(consoleSpy).toHaveBeenCalledWith('Age  : 30');
  });

  it('should use custom titles when provided', () => {
    const obj = { user_name: 'Jane Doe', user_age: 28 };
    const title = 'User Details';
    const customTitles = { user_name: 'Full Name', user_age: 'Current Age' };

    printObject(title, obj, customTitles);

    // "Full Name" is longer, so "Current Age" will be padded
    expect(consoleSpy).toHaveBeenCalledWith('Full Name   : Jane Doe');
    expect(consoleSpy).toHaveBeenCalledWith('Current Age : 28');
  });

  it('should apply padding to titles', () => {
    const obj = { status: 'Active' };
    const title = 'System Status';
    const padding = 4;
    printObject(title, obj, undefined, padding);

    expect(consoleSpy).toHaveBeenCalledWith(`    Status : Active`);
  });

  fit('should format array properties correctly', () => {
    const obj = { roles: ['admin', 'editor'] };
    const title = 'User Roles';
   debugger;
    printObject(title, obj);

    // The title for the array is printed on its own line
    expect(consoleSpy).toHaveBeenCalledWith('Roles:\n');
    // The text for the array is the joined elements
    expect(consoleSpy).toHaveBeenCalledWith('admin\neditor');
  });

  it('should filter out properties with undefined titles', () => {
    const obj = { id: 123, secret: 'hidden' };
    const title = 'Filtered Object';
    const customTitles = { id: 'Identifier', secret: undefined };
    printObject(title, obj, customTitles);

    // It should only print the 'id' field
    expect(consoleSpy).toHaveBeenCalledWith('Identifier : 123');
    // It should NOT print the 'secret' field
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('secret'));
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('hidden'));
  });

  it('should handle an empty object gracefully', () => {
    const obj = {};
    const title = 'Empty Object';
    printObject(title, obj);

    expect(consoleSpy).toHaveBeenCalledWith(`\n${title}\n---------------------------------------`);
    expect(consoleSpy).toHaveBeenCalledWith(`---------------------------------------\n`);
    // Ensure no other calls are made for rows
    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });
});
