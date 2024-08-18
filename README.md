This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Thẻ có aboslute không được bọc trong thẻ có className relative

- Khi một phần tử <h1> có thuộc tính class="absolute" không được bao bọc bởi bất kỳ phần tử nào có thuộc tính class="relative", điều này có thể dẫn đến một số vấn đề liên quan đến vị trí và bố cục trong CSS.

- Kết quả khi <h1> với position: absolute không có tổ tiên position: relative
- Vị trí: Nếu không có phần tử tổ tiên nào với position: relative, phần tử <h1> với position: absolute sẽ được định vị dựa trên viewport hoặc phần tử <html>. Điều này có thể dẫn đến vị trí không mong muốn hoặc bất kỳ vị trí nào mà bạn không dự đoán được.

- Bố cục: Phần tử <h1> có thể bị đặt ngoài vùng xem của phần tử chứa hoặc có thể che khuất các phần tử khác, vì vị trí của nó không được kiểm soát bởi bất kỳ phần tử chứa nào.

- Ta có

```jsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mt-10">
      <h1 className="absolute w-full text-center bg-gray-800 py-4 text-3xl text-white top-0">OLX SCRAPPER</h1>
      <h2>Hung dep trai</h2>
    </main>
  );
}
```

## Kết quả rút ra thẻ h1 sẽ được đẩy lên cao nhất dựa trên màn hình máy tính và không bị phụ thuộc vào thẻ cha chứa nó (dù có mt-10 ở thẻ cha thì thằng có absolute vẫn không bị ảnh hưởng và vẫn ở trên đầu)

## Lưu ý trong Input

```tsx
<div className="flex flex-col lg:flex-row w-full items-start gap-3">
    <input 
        className="p-3 border-4 border-neutral-200 rounded-lg text-gray-500"
        type="text"
        placeholder="Search for an OLX product to scrape."
        value={searchPromt}
        onChange={(e) => setSearchPromt(e.target.value)}
    />
</div>
```

- Nếu input nằm trong thẻ div có class là flex flex-col thì nó sẽ không tự động có width là 100% như ta vẫn nghĩ mà chỉ có khi ta tự xét cho nó là w-full dù ta có để thẻ div cha có w-full (Do input ở trên ta không có w-full nên input chỉ có độ dài khiêm tốn)

## Lưu ý về flex

```tsx
const Cart = () => {
    return (
        <div className="bg-red-200 h-48 flex">
            <button 
                className={`cursor-pointer bg-gray-800 w-[150px] disabled:bg-gray-400 rounded-md px-5 py-3 text-white`}
            >
                Scrape
            </button>
        </div>
    )
}

export default Cart
```

- Nếu thẻ cha có class là flex thì thẻ con sẽ chiếm hết chiều cao còn thừa của thẻ cha (button lúc này sẽ có chiều cao bằng với thẻ div cha nhưng nó sẽ không chiếm cả chiều dài của thẻ cha mà chỉ giữ nguyên)


## Giải thích về revalidatePath

-  Đoạn code bạn đưa ra đang sử dụng một hàm từ thư viện Next.js. Cụ thể, revalidatePath là một hàm từ module next/cache.

## Giải thích:
```tsx
import { revalidatePath } from "next/cache";
```
- Dòng này nhập hàm revalidatePath từ module next/cache. Điều này có nghĩa là bạn đang sử dụng một chức năng từ Next.js để quản lý bộ nhớ cache.

## Tác dụng của revalidatePath:
- revalidatePath thường được dùng để thông báo cho Next.js rằng một trang cụ thể cần được làm mới hoặc cập nhật lại. Đây là một phần của cơ chế làm mới cache để đảm bảo rằng người dùng nhận được dữ liệu mới nhất khi truy cập trang.

