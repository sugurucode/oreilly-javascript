import {transport_lf,transport_crlf} from './index.ts'
describe('改行コードテスト',() =>{
    it('LF => CR+LFに変換',() =>{
        const input:string = 'Hello\nWorld';
        const expected:string = 'Hello\r\nWorld';
        expect(transport_crlf(input)).toBe(expected);
    })
    it('CR+LF => LFに変換',() =>{
        const input:string = 'Hello\r\nWorld';
        const expected:string = 'Hello\nWorld';
        expect(transport_lf(input)).toBe(expected);
    })
})