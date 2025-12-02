"use strict";
// 𠮷野家の場合
const str1 = '𠮷野家';
console.log('𠮷野家[0]:', str1[0]); //𠮷野家[0]: �
console.log('𠮷野家[1]:', str1[1]); //𠮷野家[1]: �
console.log('𠮷野家.length:', str1.length); //𠮷野家.length: 4
// 👨‍👨‍👧‍👧の場合
const str2 = '👨‍👨‍👧‍👧';
console.log('👨‍👨‍👧‍👧[0]:', str2[0]); // 👨‍👨‍👧‍👧[0]: �
console.log('👨‍👨‍👧‍👧.length:', str2.length); //👨‍👨‍👧‍👧.length: 11
// 𠮷野家[0]: �
// 𠮷野家[1]: �
// 𠮷野家.length: 4
// 👨‍👨‍👧‍👧[0]: �
// 👨‍👨‍👧‍👧.length: 11
// 以下chatGPTでの調査
// 𠮷野家のコードポイント
console.log('𠮷野家の各文字のコードポイント:');
for (let i = 0; i < str1.length; i++) {
    console.log(`str1[${i}]: \\u${str1.charCodeAt(i).toString(16).padStart(4, '0')}`);
}
// 👨‍👨‍👧‍👧のコードポイント
console.log('\n👨‍👨‍👧‍👧の各文字のコードポイント:');
for (let i = 0; i < str2.length; i++) {
    console.log(`str2[${i}]: \\u${str2.charCodeAt(i).toString(16).padStart(4, '0')}`);
}
// 𠮷野家の各文字のコードポイント:
// str1[0]: \ud842
// str1[1]: \udfb7
// str1[2]: \u91ce
// str1[3]: \u5bb6
// 👨‍👨‍👧‍👧の各文字のコードポイント:
// str2[0]: \ud83d
// str2[1]: \udc68
// str2[2]: \u200d
// str2[3]: \ud83d
// str2[4]: \udc68
// str2[5]: \u200d
// str2[6]: \ud83d
// str2[7]: \udc67
// str2[8]: \u200d
// str2[9]: \ud83d
// str2[10]: \udc67
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTtBQUNWLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7QUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO0FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtBQUUxRCxpQkFBaUI7QUFDakIsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDO0FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7QUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7QUFFekUsYUFBYTtBQUNiLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsb0JBQW9CO0FBQ3BCLHlCQUF5QjtBQUV6QixnQkFBZ0I7QUFDaEIsZUFBZTtBQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEYsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BGLENBQUM7QUFFRCxvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBRWxCLDJCQUEyQjtBQUMzQixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsbUJBQW1CIn0=