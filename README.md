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

## Giải thich code

```tsx
export async function scrapeOlxProducts(url: string) {
    try {
        /**
         * const browser = await puppeteer.launch({ headless: false });
         * Dòng này khởi động một phiên trình duyệt mới bằng Puppeteer.
         * headless: false: Trình duyệt sẽ được mở với giao diện đồ họa (GUI). Điều này có nghĩa là bạn sẽ thấy cửa sổ trình * * * duyệt hiển thị trên màn hình. Nếu đặt headless: true, trình duyệt sẽ chạy ẩn (không có GUI).
         * 
         * const page = await browser.newPage();:
         * Dòng này mở một tab mới (hoặc một trang mới) trong phiên trình duyệt vừa khởi chạy.
         * 
         * const navigationPromise = page.waitForNavigation({ waitUntil: "networkidle0", timeout: 120000 });:
         * Bạn tạo ra một promise để chờ cho trang web hoàn thành điều hướng (nếu có).
         * waitUntil: "networkidle0": Puppeteer sẽ đợi cho đến khi không còn yêu cầu mạng nào trong ít nhất 500 milliseconds trước khi coi rằng điều hướng đã hoàn tất.
         * timeout: 120000: Nếu quá trình điều hướng không hoàn tất trong vòng 120 giây, lỗi TimeoutError sẽ được ném ra.
         * 
         * await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });:
         * Điều hướng trực tiếp đến url mà bạn muốn scrape.
         * waitUntil: "networkidle0": Puppeteer đợi cho trang tải xong hoàn toàn (không còn yêu cầu mạng nào đang diễn ra).
         * timeout: 120000: Thời gian chờ tối đa cho quá trình tải trang là 120 giây.
        */
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation({
            waitUntil: "networkidle0",
            timeout: 120000
        });
        await page.goto(url, { waitUntil: "networkidle0" , timeout: 120000});
        return null
    }
    catch(error) {
        console.log(error);
        return null
    }
}
```

## waitUntil: "networkidle0",
- waitUntil: "networkidle0" là một tùy chọn trong Puppeteer khi bạn sử dụng phương thức page.waitForNavigation() hoặc page.goto(). Tùy chọn này xác định thời điểm mà Puppeteer coi rằng quá trình tải trang web đã hoàn tất.

## Cụ thể về networkidle0:
- waitUntil: "networkidle0": Puppeteer sẽ đợi cho đến khi không còn bất kỳ kết nối mạng nào đang diễn ra trong ít nhất 500ms trước khi tiếp tục. Điều này có nghĩa là trình duyệt phải hoàn toàn không hoạt động (không có yêu cầu mạng nào đang diễn ra) trong một thời gian ngắn thì Puppeteer mới coi rằng trang đã tải xong.

## Tại sao sử dụng networkidle0?
- Khi bạn truy cập một trang web, thường có rất nhiều yêu cầu mạng (network requests) diễn ra để tải nội dung của trang như HTML, CSS, JavaScript, hình ảnh, và các tài nguyên khác. Đôi khi, các yêu cầu này có thể tiếp tục sau khi trang chính đã tải xong (ví dụ, các yêu cầu AJAX hoặc yêu cầu tải thêm nội dung động).
- Sử dụng waitUntil: "networkidle0" đảm bảo rằng Puppeteer sẽ chờ cho đến khi tất cả các yêu cầu mạng này đã hoàn tất trước khi tiếp tục với các thao tác tiếp theo. Điều này đặc biệt hữu ích khi bạn cần đảm bảo rằng toàn bộ nội dung trang đã được tải và hiển thị đầy đủ trước khi thực hiện các hành động tiếp theo như scrape dữ liệu.

## Khác biệt với các tùy chọn khác:
- networkidle2: Puppeteer sẽ đợi cho đến khi chỉ có tối đa 2 yêu cầu mạng đang diễn ra trong ít nhất 500ms trước khi tiếp tục.
- load: Puppeteer sẽ đợi cho sự kiện load (trang đã tải xong toàn bộ) của trình duyệt được kích hoạt.
- domcontentloaded: Puppeteer sẽ đợi cho sự kiện DOMContentLoaded (DOM đã được phân tích cú pháp và tải xong) được kích hoạt.

## Ví dụ tình huống sử dụng:
- Nếu bạn đang scrape một trang có nhiều yêu cầu mạng liên tục, chẳng hạn như các trang có nội dung động hoặc tải dữ liệu thông qua AJAX, thì networkidle0 sẽ giúp bạn đảm bảo rằng tất cả dữ liệu cần thiết đã được tải về trước khi bạn tiếp tục với các bước tiếp theo.

## timeout: 120000
- Tùy chọn timeout: 120000 trong Puppeteer thiết lập thời gian chờ tối đa cho một hành động cụ thể, như chờ trang web tải xong. Trong trường hợp này, thời gian chờ là 120.000 milliseconds, tương đương với 120 giây (2 phút).

## Chi tiết về timeout: 120000:
- timeout: Đây là thời gian chờ tối đa mà Puppeteer sẽ đợi cho một hành động hoàn tất (chẳng hạn như tải trang hoặc điều hướng).
- 120000: Con số này biểu thị thời gian chờ tính bằng milliseconds (1 giây = 1000 milliseconds), nên 120000 milliseconds tương đương với 120 giây.

## Cách hoạt động:
- Nếu trang web không tải xong hoặc không đạt được điều kiện yêu cầu (networkidle0 trong trường hợp này) trong vòng 120 giây, Puppeteer sẽ ném ra một lỗi (TimeoutError) để thông báo rằng hành động đã vượt quá thời gian chờ tối đa.

## Tại sao lại đặt timeout lâu như vậy?
- Đặt thời gian chờ lớn (120 giây) giúp đảm bảo rằng ngay cả các trang web tải chậm hoặc các trang web có nội dung phức tạp, nhiều tài nguyên cũng có đủ thời gian để tải xong trước khi Puppeteer tiếp tục thực hiện các hành động khác.
- Điều này có thể quan trọng nếu bạn đang scrape dữ liệu từ những trang web có tải trọng nặng hoặc kết nối mạng không ổn định.

## Ví dụ tình huống sử dụng:
- Nếu trang OLX mà bạn đang scrape có thể mất một thời gian dài để tải, bạn muốn chắc chắn rằng Puppeteer không bỏ qua quá trình này một cách quá sớm. Đặt timeout thành 120 giây cho phép bạn có đủ thời gian để tải xong trang, tránh bị lỗi do hết thời gian chờ.

## Lưu ý:
- Tùy chọn timeout có thể điều chỉnh: Bạn có thể điều chỉnh timeout dựa trên yêu cầu của dự án. Nếu trang web tải nhanh, bạn có thể giảm thời gian này xuống để tiết kiệm thời gian. Ngược lại, nếu bạn dự đoán trang web có thể tải chậm, bạn có thể giữ hoặc tăng thời gian chờ.
- Xử lý lỗi: Bạn nên có kế hoạch xử lý lỗi TimeoutError trong trường hợp thời gian chờ vượt quá, để chương trình không bị gián đoạn.

## Kết luận

1. Sau khi trang tải xong và không có kết nối mạng nào xảy ra:
- Nếu trang web hoàn tất quá trình tải trong vòng 2 phút (120 giây), Puppeteer sẽ kiểm tra xem có bất kỳ yêu cầu mạng nào đang diễn ra hay không. Với tùy chọn waitUntil: "networkidle0", Puppeteer sẽ đợi cho đến khi không có yêu cầu mạng nào (network idle) trong ít nhất 500 milliseconds (nửa giây).
- Nếu không có yêu cầu mạng nào trong thời gian này, Puppeteer coi rằng trang đã hoàn toàn tải xong, và quá trình chờ kết thúc thành công. Khi đó, Puppeteer sẽ tiếp tục thực hiện các bước tiếp theo trong code.

2. Nếu vượt quá 2 phút (120.000 milliseconds):
- Nếu sau 2 phút mà trang vẫn chưa hoàn tất việc tải hoặc vẫn có các yêu cầu mạng liên tục, Puppeteer sẽ ném ra một lỗi TimeoutError.
- Lỗi này cho biết rằng trang web không thể hoàn thành tải trong khoảng thời gian đã định (120 giây). Khi lỗi xảy ra, đoạn code trong phần catch(error) sẽ được thực thi để xử lý lỗi.

## Tóm lại:
- Nếu trang tải xong trong vòng 2 phút: Puppeteer sẽ kiểm tra xem không còn yêu cầu mạng nào và tiếp tục.
- Nếu trang không tải xong trong vòng 2 phút: Puppeteer sẽ ngừng chờ và ném ra lỗi TimeoutError.

## Lưu ý

- Thời gian 2 phút (120 giây) là do bạn tự đặt và có thể tùy chỉnh. Trang web có thể tải xong nhanh hơn nhiều, và Puppeteer sẽ không đợi hết 2 phút nếu trang đã hoàn thành tải trước đó.

## Cách hoạt động chi tiết:
- Nếu trang tải xong trước 2 phút: Puppeteer sẽ tiếp tục ngay khi trang đã tải xong và không còn yêu cầu mạng nào đang diễn ra. Điều này có thể chỉ mất vài giây nếu trang tải nhanh.
- Nếu trang mất nhiều thời gian hơn 2 phút: Puppeteer sẽ ngừng chờ sau 2 phút và ném ra lỗi TimeoutError.

## Tùy chỉnh thời gian chờ:
- Bạn có thể điều chỉnh thời gian chờ (timeout) dựa trên tình huống cụ thể của mình. Ví dụ:
- Trang tải nhanh: Giảm timeout xuống, chẳng hạn 30 giây (30000 milliseconds).
- Trang tải chậm hoặc có nội dung lớn: Giữ nguyên hoặc tăng thời gian chờ nếu cần.
- Việc đặt thời gian chờ phụ thuộc vào đặc điểm của trang web bạn đang scrape và yêu cầu của dự án.

## Một số điểm lưu ý:
- Trình tự thực thi:
+ Khi bạn gọi await page.goto(url, { ... });, Puppeteer sẽ điều hướng đến trang web được chỉ định và đợi trang tải xong trước khi tiếp tục với các dòng lệnh tiếp theo.
+ navigationPromise ở trên là một hứa hẹn để chờ đợi một sự kiện điều hướng khác (nếu có) nhưng chưa được await (được sử dụng) nên không tác động đến dòng tiếp theo (await page.goto(...)).

- Redundancy:
+ Việc tạo navigationPromise mà không await (chờ) có thể gây nhầm lẫn, vì Puppeteer sẽ thực sự chờ điều hướng thông qua page.goto(url, ...) với các tùy chọn giống nhau. Bạn có thể bỏ qua navigationPromise nếu không có mục đích cụ thể.

## Điều chỉnh:
- Nếu mục đích là điều hướng đến url và đợi trang tải xong, bạn có thể đơn giản hóa đoạn code này bằng cách bỏ qua navigationPromise, vì page.goto() đã bao gồm việc chờ điều hướng với các tùy chọn tương tự:

```jsx
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
```
