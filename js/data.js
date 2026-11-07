/*
 * TOÀN BỘ NỘI DUNG CỦA WEBSITE NẰM Ở FILE NÀY.
 * Mọi thông tin dưới đây đều là DỮ LIỆU MẪU: tên, liên hệ, số liệu, bảng giá,
 * cảm nhận khách hàng và ảnh. Hãy thay bằng thông tin thật trước khi đưa lên mạng.
 */

const SITE = {
  name: "Lưu Ảnh Studio",
  tagline: "Nhiếp ảnh cưới, chân dung và sự kiện",
  phone: "0900 000 000",
  email: "hello@example.com",
  address: "TP. Hồ Chí Minh, nhận chụp toàn quốc",
  // Dán link đầy đủ vào đây. Để trống thì mục đó không hiện trên trang.
  instagram: "",
  facebook: "",
  zalo: "",
  stats: [
    { value: "8 năm", label: "cầm máy chuyên nghiệp" },
    { value: "300+", label: "buổi chụp đã thực hiện" },
    { value: "21 ngày", label: "giao trọn bộ ảnh" },
  ],
  // Đổi thành false khi website không còn dùng ảnh từ Unsplash.
  showUnsplashCredit: true,
};

const SERVICES = [
  {
    name: "Phóng sự cưới",
    price: "Từ 12.000.000đ",
    desc: "Theo sát cả ngày trọng đại, từ lúc chuẩn bị đến khi tiệc tàn.",
    includes: ["2 nhiếp ảnh gia", "10 giờ chụp", "500+ ảnh đã chỉnh màu", "Album in 30 trang"],
  },
  {
    name: "Ảnh cưới ngoại cảnh",
    price: "Từ 8.000.000đ",
    desc: "Một ngày đi chụp cùng nhau, ở nơi có ý nghĩa với hai bạn.",
    includes: ["1 địa điểm", "6 giờ chụp", "80 ảnh chỉnh chi tiết", "Hỗ trợ tạo dáng"],
  },
  {
    name: "Chân dung cá nhân",
    price: "Từ 2.500.000đ",
    desc: "Ảnh hồ sơ, thương hiệu cá nhân hoặc đơn giản là một bộ ảnh cho mình.",
    includes: ["2 giờ chụp", "Studio hoặc ngoại cảnh", "20 ảnh chỉnh chi tiết", "Tư vấn trang phục"],
  },
  {
    name: "Sự kiện & doanh nghiệp",
    price: "Từ 4.000.000đ",
    desc: "Hội nghị, ra mắt sản phẩm, tiệc công ty. Có ảnh xem nhanh trong ngày.",
    includes: ["4 giờ chụp", "Không giới hạn số ảnh", "Giao ảnh chọn trong 24 giờ", "Xuất hoá đơn"],
  },
];

const TESTIMONIALS = [
  {
    quote: "Cả ngày cưới chúng mình gần như quên mất có người đang chụp. Đến lúc xem ảnh mới thấy những khoảnh khắc mà chính mình cũng đã bỏ lỡ.",
    author: "Thu Hà & Quốc Bảo",
    context: "Phóng sự cưới, Đà Lạt",
  },
  {
    quote: "Mình rất ngại ống kính, nhưng sau mười lăm phút trò chuyện thì mọi thứ tự nhiên hẳn. Bộ ảnh này mình dùng cho hồ sơ suốt hai năm nay.",
    author: "Minh Anh",
    context: "Chân dung cá nhân",
  },
  {
    quote: "Hội nghị kết thúc lúc 5 giờ chiều, 7 giờ tối đội truyền thông đã có ảnh để đăng. Đúng tiến độ và không cần nhắc lần nào.",
    author: "Phòng Marketing, công ty khách hàng",
    context: "Sự kiện doanh nghiệp",
  },
];

// Các danh mục lọc trong phần tác phẩm. "cat" của mỗi ảnh phải trùng với "key" ở đây.
const CATEGORIES = [
  { key: "cuoi", label: "Cưới" },
  { key: "chan-dung", label: "Chân dung" },
  { key: "phong-canh", label: "Phong cảnh" },
  { key: "su-kien", label: "Sự kiện" },
];

/*
 * Ảnh ở đầu trang. Cách thêm giống hệt PHOTOS bên dưới.
 * "focus" (không bắt buộc) là điểm giữ lại khi ảnh bị cắt trên màn hình dọc: "20% 50%" là lệch về bên trái.
 */
const HERO = [
  { id: "1528127269322-539801943592", title: "Vịnh Hạ Long", alt: "Thuyền trên vịnh Hạ Long giữa các đảo đá vôi" },
  { id: "1591604466107-ec97de577aff", title: "Bên hồ, cuối buổi chiều", alt: "Cô dâu chú rể đứng cạnh nhau bên hồ trong nắng chiều", focus: "26% 50%" },
  { id: "1519741497674-611481863552", title: "Bó hoa trong tay cô dâu", alt: "Cô dâu cầm bó hoa trong ánh sáng ngược ấm áp" },
];

/*
 * Ảnh trong phần tác phẩm, hiển thị theo đúng thứ tự trong danh sách.
 *
 * Để dùng ảnh của bạn: chép ảnh vào thư mục images/ rồi thêm một dòng như sau.
 *   { file: "images/ten-anh.jpg", cat: "cuoi", title: "Chú thích", alt: "Mô tả ảnh", w: 3, h: 2 }
 * w và h là tỉ lệ ảnh: ảnh ngang thường là 3 và 2, ảnh dọc là 2 và 3.
 * Các dòng có "id" là ảnh mẫu từ Unsplash, cần được xoá dần khi có ảnh thật.
 */
const PHOTOS = [
  { id: "1537633552985-df8429e8048b", cat: "cuoi", title: "Khăn voan trước gió biển", alt: "Cô dâu chú rể trên bãi đá ven biển, khăn voan dài bay trong gió", w: 2, h: 3 },
  { id: "1534528741775-53994a69daeb", cat: "chan-dung", title: "Xanh tím", alt: "Chân dung cô gái trong ánh đèn xanh tím", w: 4, h: 5 },
  { id: "1557750255-c76072a7aad1", cat: "phong-canh", title: "Ninh Bình", alt: "Ngôi chùa nhỏ bên mặt nước giữa núi đá vôi xanh", w: 3, h: 2 },
  { id: "1470229722913-7c0e2dbbafd3", cat: "su-kien", title: "Trước giờ mở màn", alt: "Đám đông hướng về sân khấu rực sáng ánh đèn cam", w: 3, h: 2 },
  { id: "1460978812857-470ed1c77af0", cat: "cuoi", title: "Nụ hôn đen trắng", alt: "Ảnh đen trắng cô dâu chú rể hôn nhau trên bãi biển", w: 12, h: 7 },
  { id: "1506794778202-cad84cf45f1d", cat: "chan-dung", title: "Nền tối", alt: "Chân dung người đàn ông mặc áo len trên nền đen", w: 2, h: 3 },
  { id: "1559592413-7cec4d0cae2b", cat: "phong-canh", title: "Cầu Vàng, Đà Nẵng", alt: "Cầu Vàng được đỡ bởi hai bàn tay đá khổng lồ", w: 8, h: 5 },
  { id: "1523580494863-6f3031224c94", cat: "su-kien", title: "Hội thảo", alt: "Người tham dự ngồi nghe trong phòng hội thảo", w: 3, h: 2 },
  { id: "1583939003579-730e3918a45a", cat: "cuoi", title: "Giữa bạn bè", alt: "Cô dâu chú rể hôn nhau, bạn bè đứng quanh tung hoa", w: 2, h: 3 },
  { id: "1544005313-94ddf0286df2", cat: "chan-dung", title: "Hoàng hôn", alt: "Chân dung cô gái áo sọc trong ánh hoàng hôn", w: 2, h: 3 },
  { id: "1583417319070-4a69db38a482", cat: "phong-canh", title: "Sài Gòn lên đèn", alt: "Các toà nhà Sài Gòn bên sông lúc chiều tối", w: 3, h: 2 },
  { id: "1492684223066-81342ee5ff30", cat: "su-kien", title: "Mưa giấy", alt: "Pháo giấy bay kín không gian phía trên đám đông", w: 3, h: 2 },
  { id: "1465495976277-4387d4b0b4c6", cat: "cuoi", title: "Đôi bàn tay", alt: "Tay cô dâu chú rể đặt lên nhau cạnh bó hoa", w: 3, h: 2 },
  { id: "1531746020798-e6953c6e8e04", cat: "chan-dung", title: "Hồng phấn", alt: "Chân dung cô gái búi tóc trên nền hồng", w: 4, h: 5 },
  { id: "1433086966358-54859d0ed716", cat: "phong-canh", title: "Thác trong rừng", alt: "Thác nước cao đổ xuống giữa vách đá phủ rêu xanh", w: 2, h: 3 },
  { id: "1475721027785-f74eccf877e2", cat: "su-kien", title: "Lời phát biểu", alt: "Micro cận cảnh, phía sau là khách dự tiệc", w: 3, h: 2 },
  { id: "1606216794074-735e91aa2c92", cat: "cuoi", title: "Dưới tán cọ", alt: "Cô dâu chú rể nắm tay đi dưới tán cây cọ lớn", w: 2, h: 3 },
  { id: "1500648767791-00dcc994a43e", cat: "chan-dung", title: "Ảnh hồ sơ", alt: "Chân dung người đàn ông mỉm cười, áo len xám", w: 2, h: 3 },
  { id: "1506744038136-46273834b3fb", cat: "phong-canh", title: "Thung lũng buổi sớm", alt: "Thung lũng và dòng sông với rừng thông lúc bình minh", w: 3, h: 2 },
  { id: "1540575467063-178a50c2df87", cat: "su-kien", title: "Khán phòng", alt: "Khán giả ngồi kín hội trường tối", w: 3, h: 2 },
  { id: "1469371670807-013ccf25f16a", cat: "cuoi", title: "Lối vào lễ đường", alt: "Lối đi lễ cưới ngoài trời hai bên đặt hoa và ghế gỗ", w: 3, h: 2 },
  { id: "1517841905240-472988babdf9", cat: "chan-dung", title: "Tường xanh", alt: "Cô gái mặc áo khoác jean đứng trước bức tường xanh", w: 2, h: 3 },
  { id: "1505765050516-f72dcac9c60e", cat: "phong-canh", title: "Đỉnh núi trong sương", alt: "Đỉnh núi phủ tuyết nhô lên khỏi mây mù", w: 3, h: 2 },
  { id: "1511578314322-379afb476865", cat: "su-kien", title: "Trước giờ đón khách", alt: "Hội trường bày bàn tròn trắng trước sự kiện", w: 3, h: 2 },
  { id: "1525258946800-98cfd641d0de", cat: "cuoi", title: "Hoa cưới", alt: "Cô dâu cầm bó hoa hồng màu đào trước váy trắng", w: 2, h: 3 },
  { id: "1438761681033-6461ffad8d80", cat: "chan-dung", title: "Bên hồ", alt: "Chân dung cô gái tóc đỏ đứng trước hồ và núi", w: 3, h: 2 },
  { id: "1501785888041-af3ef285b470", cat: "phong-canh", title: "Con thuyền trên hồ", alt: "Con thuyền nhỏ trên mặt hồ xanh ngọc giữa núi", w: 3, h: 2 },
  { id: "1501281668745-f7f57925c3b4", cat: "su-kien", title: "Giơ máy lên", alt: "Bàn tay giơ điện thoại quay sân khấu đầy ánh đèn", w: 3, h: 2 },
];
