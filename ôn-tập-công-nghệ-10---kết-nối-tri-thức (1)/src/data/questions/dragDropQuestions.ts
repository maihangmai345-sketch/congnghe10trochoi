import { DragDropQuestionSet } from '../../types/game';

export const DRAG_DROP_QUESTIONS: DragDropQuestionSet[] = [
  // BÀI 3 - BỘ 1
  {
    id: 'dd-b3-s1',
    lessonId: 'bai-3',
    title: 'Kéo thả: Phương pháp gia công cơ khí (Bộ 1)',
    explanation: 'Bài 3 SGK: Đúc là rót kim loại lỏng vào khuôn; Cắt gọt tạo phoi; Gia công áp lực dựa vào tính dẻo kim loại; Hàn nung chảy/ép tạo liên kết vĩnh cửu.',
    type: 'drag-drop',
    instruction: 'Kéo tên phương pháp công nghệ vào đúng bản chất kỹ thuật tương ứng:',
    slots: [
      { id: 's1', label: 'Rót kim loại lỏng vào khuôn', description: 'Tạo sản phẩm/phôi có hình dạng kích thước theo lòng khuôn' },
      { id: 's2', label: 'Bóc tách kim loại tạo ra phoi', description: 'Sử dụng dao tiện, phay, bào, mài để tăng độ chính xác chi tiết' },
      { id: 's3', label: 'Tác dụng ngoại lực dựa vào tính dẻo', description: 'Cán, kéo, rèn, dập để định hình phôi mà không làm đứt gãy' },
      { id: 's4', label: 'Nung nóng liên kết không thể tháo rời', description: 'Gắn kết các chi tiết bằng cách nung đến trạng thái chảy hoặc dẻo' },
    ],
    items: [
      { id: 'i1', text: 'Công nghệ Đúc', targetSlotId: 's1' },
      { id: 'i2', text: 'Gia công Cắt gọt', targetSlotId: 's2' },
      { id: 'i3', text: 'Gia công Áp lực', targetSlotId: 's3' },
      { id: 'i4', text: 'Công nghệ Hàn', targetSlotId: 's4' },
    ]
  },
  // BÀI 3 - BỘ 2
  {
    id: 'dd-b3-s2',
    lessonId: 'bai-3',
    title: 'Kéo thả: Ứng dụng Điện - Cơ và Điện - Quang (Bộ 2)',
    explanation: 'Bài 3 SGK: Thiết bị chuyển động quay (quạt, máy bơm, máy xay); chuyển động tịnh tiến (rơ le, van từ); Biến điện thành quang (đèn LED, đèn huỳnh quang).',
    type: 'drag-drop',
    instruction: 'Kéo từng thiết bị vào đúng nhóm nguyên lý hoạt động điện năng:',
    slots: [
      { id: 's1', label: 'Điện - cơ dạng quay', description: 'Động cơ điện biến điện năng thành chuyển động tròn xoay liên tục' },
      { id: 's2', label: 'Điện - cơ dạng tịnh tiến', description: 'Biến điện năng thành lực kéo hoặc đẩy thẳng đường ống, tiếp điểm' },
      { id: 's3', label: 'Điện - quang phát sáng qua đi-ốt', description: 'Dòng điện 1 chiều chạy qua chất bán dẫn phát ra ánh sáng trực tiếp' },
      { id: 's4', label: 'Điện - quang phóng điện qua khí', description: 'Sự phóng điện tạo tia tử ngoại tác động vào lớp bột huỳnh quang' },
    ],
    items: [
      { id: 'i1', text: 'Quạt điện / Máy xay sinh tố', targetSlotId: 's1' },
      { id: 'i2', text: 'Rơ le điện từ / Van điện từ', targetSlotId: 's2' },
      { id: 'i3', text: 'Bóng đèn LED chiếu sáng', targetSlotId: 's3' },
      { id: 'i4', text: 'Bóng đèn huỳnh quang', targetSlotId: 's4' },
    ]
  },
  // BÀI 4 - BỘ 1
  {
    id: 'dd-b4-s1',
    lessonId: 'bai-4',
    title: 'Kéo thả: Chu trình sản xuất hiện đại CAD/CAM/CNC & In 3D (Bộ 1)',
    explanation: 'Bài 4 SGK: CAD là thiết kế trên máy tính; CAM là lập quy trình công nghệ gia công; CNC là máy điều khiển số gia công; In 3D là đắp dần từng lớp vật liệu.',
    type: 'drag-drop',
    instruction: 'Kéo các giai đoạn công nghệ vào đúng chức năng trong chuỗi sản xuất hiện đại:',
    slots: [
      { id: 's1', label: 'Thiết kế mô hình hình học trên máy tính', description: 'Giai đoạn tạo dựng bản vẽ 3D với thông số kích thước chính xác' },
      { id: 's2', label: 'Lập quy trình gia công tự động', description: 'Chuyển đổi thiết kế sang đường chạy dao và mã lệnh gia công' },
      { id: 's3', label: 'Gia công chi tiết thực tế trên máy số', description: 'Thiết bị điều khiển số tự động cắt gọt theo chương trình máy tính' },
      { id: 's4', label: 'Bồi đắp lớp vật liệu 2D liên tiếp', description: 'Công nghệ chế tạo đắp dần từng lớp tuần tự tạo hình dạng 3D phức tạp' },
    ],
    items: [
      { id: 'i1', text: 'Phần mềm CAD (Computer Aided Design)', targetSlotId: 's1' },
      { id: 'i2', text: 'Phần mềm CAM (Computer Aided Manufacturing)', targetSlotId: 's2' },
      { id: 'i3', text: 'Máy công cụ CNC (Computer Numerical Control)', targetSlotId: 's3' },
      { id: 'i4', text: 'Công nghệ In 3D (Additive Manufacturing)', targetSlotId: 's4' },
    ]
  },
  // BÀI 4 - BỘ 2
  {
    id: 'dd-b4-s2',
    lessonId: 'bai-4',
    title: 'Kéo thả: Khái niệm cốt lõi Công nghệ mới (Bộ 2)',
    explanation: 'Bài 4 SGK: Nano (1-100nm); IoT (thuật ngữ Kevin Ashton 1999); AI (mô phỏng trí tuệ con người); Robot thông minh (có bộ não nhận thức ra quyết định).',
    type: 'drag-drop',
    instruction: 'Kéo công nghệ vào đúng định nghĩa chuẩn sách giáo khoa:',
    slots: [
      { id: 's1', label: 'Kích thước siêu hiển vi từ 1 đến 100 nm', description: 'Tận dụng các tính chất cơ, lý, hóa đặc biệt ở cấp độ nguyên tử/phân tử' },
      { id: 's2', label: 'Mạng lưới vạn vật kết nối Internet', description: 'Thu thập và trao đổi dữ liệu giữa máy móc và con người qua môi trường mạng' },
      { id: 's3', label: 'Hệ thống mô phỏng trí tuệ con người', description: 'Máy tính có khả năng tự suy luận, học hỏi, nhận diện và phân tích dữ liệu' },
      { id: 's4', label: 'Cỗ máy có "bộ não" tự thích ứng', description: 'Tự nhận biết biến đổi môi trường và quyết định hành động tối ưu' },
    ],
    items: [
      { id: 'i1', text: 'Công nghệ Nano', targetSlotId: 's1' },
      { id: 'i2', text: 'Internet vạn vật (IoT)', targetSlotId: 's2' },
      { id: 'i3', text: 'Trí tuệ nhân tạo (AI)', targetSlotId: 's3' },
      { id: 'i4', text: 'Robot thông minh', targetSlotId: 's4' },
    ]
  },
  // BÀI 6 - BỘ 1
  {
    id: 'dd-b6-s1',
    lessonId: 'bai-6',
    title: 'Kéo thả: Đặc trưng 4 Cuộc Cách mạng Công nghiệp (Bộ 1)',
    explanation: 'Bài 6 SGK: CMCN 1: Hơi nước & cơ giới hoá; CMCN 2: Năng lượng điện & sản xuất hàng loạt; CMCN 3: CNTT & tự động hoá; CMCN 4: Công nghệ số, kết nối & AI.',
    type: 'drag-drop',
    instruction: 'Kéo đặc trưng tiêu biểu vào đúng cuộc cách mạng công nghiệp:',
    slots: [
      { id: 's1', label: 'Cách mạng Công nghiệp lần 1 (Cuối TK XVIII)', description: 'Chuyển từ lao động thủ công sang sử dụng động cơ chạy bằng than đá' },
      { id: 's2', label: 'Cách mạng Công nghiệp lần 2 (Cuối TK XIX)', description: 'Kỷ nguyên điện khí hoá và sự xuất hiện của động cơ đốt trong' },
      { id: 's3', label: 'Cách mạng Công nghiệp lần 3 (Những năm 70 TK XX)', description: 'Sự bùng nổ của máy tính bán dẫn, viễn thông và mạng Internet' },
      { id: 's4', label: 'Cách mạng Công nghiệp lần 4 (Hiện nay)', description: 'Không gian số hoá, hệ thống vật lý - mạng và trí tuệ nhân tạo toàn diện' },
    ],
    items: [
      { id: 'i1', text: 'Động cơ hơi nước & Cơ giới hoá', targetSlotId: 's1' },
      { id: 'i2', text: 'Năng lượng điện & Sản xuất hàng loạt quy mô lớn', targetSlotId: 's2' },
      { id: 'i3', text: 'Công nghệ thông tin & Tự động hoá sản xuất', targetSlotId: 's3' },
      { id: 'i4', text: 'Công nghệ số, Trí tuệ nhân tạo (AI) & IoT', targetSlotId: 's4' },
    ]
  },
  // BÀI 6 - BỘ 2
  {
    id: 'dd-b6-s2',
    lessonId: 'bai-6',
    title: 'Kéo thả: Nhà khoa học & Sáng chế lịch sử (Bộ 2)',
    explanation: 'Bài 6 SGK: James Watt (động cơ hơi nước 1784); Thomas Edison (nhà máy điện 1882); Henry Ford (dây chuyền ô tô 1908); Karl Benz (ô tô chạy động cơ đốt trong 1885).',
    type: 'drag-drop',
    instruction: 'Kéo tên nhà phát minh vĩ đại vào công trình sáng chế tương ứng:',
    slots: [
      { id: 's1', label: 'Hoàn thiện Động cơ hơi nước (1784)', description: 'Tạo động lực vô tận thay thế sức người và súc vật cho nhà máy dệt, tàu hoả' },
      { id: 's2', label: 'Khai trương Nhà máy điện thương mại (1882)', description: 'Cung cấp nguồn điện chiếu sáng và sản xuất đầu tiên tại New York' },
      { id: 's3', label: 'Chế tạo xe hơi chạy động cơ đốt trong (1885)', description: 'Mở đầu cuộc cách mạng phương tiện giao thông đường bộ chạy xăng' },
      { id: 's4', label: 'Dây chuyền lắp ráp ô tô chuyển động (1908)', description: 'Hạ giá thành sản phẩm ngoạn mục, đưa ô tô tới tay hàng triệu người' },
    ],
    items: [
      { id: 'i1', text: 'James Watt (Scotland)', targetSlotId: 's1' },
      { id: 'i2', text: 'Thomas Edison (Hoa Kỳ)', targetSlotId: 's2' },
      { id: 'i3', text: 'Karl Benz (Đức)', targetSlotId: 's3' },
      { id: 'i4', text: 'Henry Ford (Hoa Kỳ)', targetSlotId: 's4' },
    ]
  },
  // TỔNG HỢP - BỘ 1 & BỘ 2
  {
    id: 'dd-th-s1',
    lessonId: 'tong-hop',
    title: 'Kéo thả Tổng hợp: Phân định Lĩnh vực Công nghệ (Bộ 1)',
    explanation: 'Tổng hợp SGK: Quạt điện thuộc Điện-Cơ; Thủy điện thuộc Sản xuất điện năng; Cán dập thuộc Gia công áp lực; Hạt nano bạc thuộc Công nghệ mới.',
    type: 'drag-drop',
    instruction: 'Kéo sản phẩm / hiện tượng vào đúng phân loại công nghệ học đường:',
    slots: [
      { id: 's1', label: 'Sản xuất điện năng sạch', description: 'Khai thác cơ năng dòng chảy tích tụ trên đập thủy điện cao' },
      { id: 's2', label: 'Gia công áp lực kim loại', description: 'Ép các tấm thép dày thành vỏ xe ô tô hoặc bình áp suất' },
      { id: 's3', label: 'Vật liệu nano kháng khuẩn', description: 'Phủ lên khẩu trang và đồ bảo hộ y tế chống lây nhiễm chéo' },
      { id: 's4', label: 'Công nghệ truyền thông vô tuyến', description: 'Truyền tín hiệu âm thanh hình ảnh bằng vi sóng hoặc sóng vô tuyến' },
    ],
    items: [
      { id: 'i1', text: 'Nhà máy Thủy điện Hòa Bình', targetSlotId: 's1' },
      { id: 'i2', text: 'Dập nguội vỏ thân xe hơi', targetSlotId: 's2' },
      { id: 'i3', text: 'Vải dệt tích hợp Nano Bạc', targetSlotId: 's3' },
      { id: 'i4', text: 'Trạm phát sóng di động 5G', targetSlotId: 's4' },
    ]
  },
  {
    id: 'dd-th-s2',
    lessonId: 'tong-hop',
    title: 'Kéo thả Tổng hợp: Trụ cột Nhà máy thông minh (Bộ 2)',
    explanation: 'Bài 4 & 6 SGK: Smart Factory tích hợp Big Data, Cloud Computing, IoT, Robot thế hệ mới làm việc 24/7.',
    type: 'drag-drop',
    instruction: 'Kéo trụ cột công nghệ vào vai trò trong Nhà máy Thông minh (Smart Factory):',
    slots: [
      { id: 's1', label: 'Thu thập trạng thái cảm biến máy móc', description: 'Các đầu đọc nhiệt độ, độ rung truyền thông tin liên tục qua mạng IP' },
      { id: 's2', label: 'Lưu trữ và điều phối dữ liệu từ xa', description: 'Cho phép kỹ sư giám sát và ra lệnh sản xuất từ bất cứ đâu trên thế giới' },
      { id: 's3', label: 'Phân tích dự đoán sự cố hỏng hóc', description: 'Xử lý lượng dữ liệu khổng lồ để phát hiện hao mòn trước khi dừng máy' },
      { id: 's4', label: 'Vận chuyển và lắp ráp linh kiện tự hành', description: 'Các robot phối hợp di chuyển an toàn giữa các phân xưởng 24/7' },
    ],
    items: [
      { id: 'i1', text: 'Cảm biến IoT (Internet vạn vật)', targetSlotId: 's1' },
      { id: 'i2', text: 'Điện toán đám mây (Cloud Computing)', targetSlotId: 's2' },
      { id: 'i3', text: 'Dữ liệu lớn (Big Data) & AI', targetSlotId: 's3' },
      { id: 'i4', text: 'Robot thông minh tự hành (AMR/AGV)', targetSlotId: 's4' },
    ]
  }
];
