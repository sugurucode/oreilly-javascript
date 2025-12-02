import { promisify } from 'util';
import { exec } from 'child_process';
describe('charfreq', () => {
    it('変更前と結果が同じであること', async () => {
        const stdout = await promisify(exec)('npx tsx exercises-public/exercises/ch02/ex05/index.ts < exercises-public/exercises/ch02/ex05/charfreq.ts');
        const expectedStdout = await promisify(exec)('npx tsx exercises-public/exercises/ch02/ex05/charfreq.ts < exercises-public/exercises/ch02/ex05/charfreq.ts');
        expect(stdout.toString()).toBe(expectedStdout.toString());
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQTtBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBRXBDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0lBQ3hCLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM5QixNQUFNLE1BQU0sR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FDbEMsMEdBQTBHLENBQzNHLENBQUE7UUFDRCxNQUFNLGNBQWMsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FDMUMsNkdBQTZHLENBQzlHLENBQUE7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQzNELENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==