import { ClassificationQuestionSet } from '../../types/game';

export const CLASSIFICATION_QUESTIONS: ClassificationQuestionSet[] = [
  // BÀI 3 - BỘ 1
  {
    id: 'cl-b3-s1',
    lessonId: 'bai-3',
    title: 'Phân loại Công nghệ: Cơ khí - Luyện kim vs Điện - Điện tử (Bộ 1)',
    explanation: 'Bài 3 SGK chia 10 công nghệ phổ biến thành 2 nhóm lớn: I. Lĩnh vực Luyện kim, Cơ khí (Luyện kim, Đúc, Cắt gọt, Áp lực, Hàn) và II. Lĩnh vực Điện - Điện tử (Sản xuất điện, Điện-quang, Điện-cơ, Điều khiển tự động hóa, Truyền thông không dây).',
    type: 'classification',
    instruction: 'Phân loại 6 công nghệ phổ biến sau vào đúng 2 lĩnh vực lớn theo SGK:',
    categories: [
      { id: 'cat-mech', name: 'Luyện kim & Cơ khí', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
      { id: 'cat-elec', name: 'Điện - Điện tử', color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' },
    ],
    items: [
      { id: 'c1', text: 'Công nghệ Đúc khuôn cát', categoryId: 'cat-mech', detailHint: 'Nấu kim loại lỏng rót vào khuôn' },
      { id: 'c2', text: 'Công nghệ Gia công cắt gọt', categoryId: 'cat-mech', detailHint: 'Tiện, phay, bào, mài tạo phoi' },
      { id: 'c3', text: 'Công nghệ Hàn hồ quang', categoryId: 'cat-mech', detailHint: 'Nối chi tiết kim loại không tháo rời' },
      { id: 'c4', text: 'Sản xuất điện bằng thủy năng', categoryId: 'cat-elec', detailHint: 'Biến cơ năng dòng nước thành điện' },
      { id: 'c5', text: 'Chiếu sáng bằng đèn LED', categoryId: 'cat-elec', detailHint: 'Biến điện năng thành quang năng' },
      { id: 'c6', text: 'Mạng viễn thông không dây Wi-Fi', categoryId: 'cat-elec', detailHint: 'Truyền thông tin bằng sóng điện từ' },
    ]
  },
  // BÀI 3 - BỘ 2
  {
    id: 'cl-b3-s2',
    lessonId: 'bai-3',
    title: 'Phân loại Sản phẩm: Kim loại Đen vs Kim loại Màu (Bộ 2)',
    explanation: 'Bài 3 mục 1 SGK: Công nghệ luyện kim chia làm: Luyện kim đen (tạo ra gang và thép) và Luyện kim màu (tạo ra nhôm, đồng, vàng, chì, kẽm,...).',
    type: 'classification',
    instruction: 'Phân loại các sản phẩm kim loại sau vào đúng nhánh luyện kim:',
    categories: [
      { id: 'cat-black', name: 'Luyện kim đen', color: 'border-slate-500/40 bg-slate-500/10 text-slate-300' },
      { id: 'cat-color', name: 'Luyện kim màu', color: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300' },
    ],
    items: [
      { id: 'c7', text: 'Gang thỏi trong lò cao', categoryId: 'cat-black', detailHint: 'Hợp kim của sắt và carbon (>2.14% C)' },
      { id: 'c8', text: 'Thép kết cấu xây dựng', categoryId: 'cat-black', detailHint: 'Hợp kim sắt carbon (<2.14% C)' },
      { id: 'c9', text: 'Dây dẫn điện bằng đồng nguyên chất', categoryId: 'cat-color', detailHint: 'Kim loại màu dẫn điện tốt' },
      { id: 'c10', text: 'Khung hợp kim nhôm định hình', categoryId: 'cat-color', detailHint: 'Kim loại màu nhẹ, bền' },
      { id: 'c11', text: 'Vàng ròng 9999 dùng làm vi mạch', categoryId: 'cat-color', detailHint: 'Kim loại màu quý không bị oxi hóa' },
      { id: 'c12', text: 'Lớp mạ kẽm chống rỉ sét', categoryId: 'cat-color', detailHint: 'Kim loại màu bảo vệ bề mặt thép' },
    ]
  },
  // BÀI 4 - BỘ 1
  {
    id: 'cl-b4-s1',
    lessonId: 'bai-4',
    title: 'Phân loại Công nghệ mới: Phần mềm & Dữ liệu số vs Phần cứng & Chế tạo (Bộ 1)',
    explanation: 'Bài 4 SGK: Nhóm phần mềm & số gồm AI, IoT, CAM, Big Data; nhóm vật liệu & chế tạo gồm Nano, In 3D, CNC máy thực thi, Robot thông minh.',
    type: 'classification',
    instruction: 'Phân loại các công nghệ mới vào nhánh Bản chất công nghệ:',
    categories: [
      { id: 'cat-soft', name: 'Dữ liệu số & Trí tuệ ảo', color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300' },
      { id: 'cat-hard', name: 'Vật liệu & Chế tạo vật lý', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
    ],
    items: [
      { id: 'c13', text: 'Trí tuệ nhân tạo (AI học máy)', categoryId: 'cat-soft', detailHint: 'Thuật toán mô phỏng suy nghĩ con người' },
      { id: 'c14', text: 'Giao thức truyền dữ liệu IoT', categoryId: 'cat-soft', detailHint: 'Mạng kết nối và trao đổi dữ liệu số' },
      { id: 'c15', text: 'Phần mềm thiết kế CAD 3D', categoryId: 'cat-soft', detailHint: 'Dựng bản vẽ kỹ thuật trên máy tính tính toán' },
      { id: 'c16', text: 'Kỹ thuật in đắp lớp In 3D', categoryId: 'cat-hard', detailHint: 'Đắp sợi nhựa/bột kim loại thành chi tiết' },
      { id: 'c17', text: 'Vật liệu kích thước Nano (1-100nm)', categoryId: 'cat-hard', detailHint: 'Cấu trúc vật lý siêu vi ứng dụng y tế' },
      { id: 'c18', text: 'Tua-bin gió & Pin mặt trời quang điện', categoryId: 'cat-hard', detailHint: 'Thiết bị thu giữ chuyển đổi năng lượng tự nhiên' },
    ]
  },
  // BÀI 4 - BỘ 2
  {
    id: 'cl-b4-s2',
    lessonId: 'bai-4',
    title: 'Phân loại Năng lượng: Năng lượng Tái tạo vs Năng lượng Không tái tạo (Bộ 2)',
    explanation: 'Bài 4 mục 4 SGK: Năng lượng tái tạo là năng lượng chuyển hoá từ các nguồn liên tục, vô hạn, ít tác động tiêu cực đến môi trường (mặt trời, gió, địa nhiệt, năng lượng nước...). Ngược lại là than đá, dầu mỏ, khí đốt.',
    type: 'classification',
    instruction: 'Phân chia các nguồn năng lượng sau vào 2 nhóm chuẩn SGK:',
    categories: [
      { id: 'cat-renew', name: 'Năng lượng tái tạo (Sạch)', color: 'border-green-500/40 bg-green-500/10 text-green-300' },
      { id: 'cat-fossil', name: 'Năng lượng không tái tạo (Hóa thạch)', color: 'border-rose-500/40 bg-rose-500/10 text-rose-300' },
    ],
    items: [
      { id: 'c19', text: 'Bức xạ ánh sáng Mặt trời', categoryId: 'cat-renew', detailHint: 'Nguồn vô tận từ tự nhiên' },
      { id: 'c20', text: 'Động năng luồng Gió tự nhiên', categoryId: 'cat-renew', detailHint: 'Quay cánh quạt tuabin phát điện' },
      { id: 'c21', text: 'Nhiệt lượng Địa nhiệt lòng đất', categoryId: 'cat-renew', detailHint: 'Hơi nước nóng tự nhiên sâu trong lòng đất' },
      { id: 'c22', text: 'Than đá đốt lò nhiệt điện', categoryId: 'cat-fossil', detailHint: 'Nguồn khoáng sản hữu hạn cạn kiệt' },
      { id: 'c23', text: 'Dầu mỏ diesel chạy máy phát điện', categoryId: 'cat-fossil', detailHint: 'Nhiên liệu hóa thạch phát thải CO2' },
      { id: 'c24', text: 'Khí đốt thiên nhiên tự nhiên', categoryId: 'cat-fossil', detailHint: 'Khí hóa lỏng hữu hạn trong lòng đất' },
    ]
  },
  // BÀI 6 - BỘ 1
  {
    id: 'cl-b6-s1',
    lessonId: 'bai-6',
    title: 'Phân loại Thời kỳ CMCN: CMCN 1.0 & 2.0 vs CMCN 3.0 & 4.0 (Bộ 1)',
    explanation: 'Bài 6 SGK: CMCN 1.0 & 2.0 thuộc thời kỳ công nghiệp truyền thống (hơi nước, điện năng cơ bắp, dây chuyền máy móc); CMCN 3.0 & 4.0 thuộc thời kỳ tự động hóa, thông tin, không gian mạng và trí tuệ nhân tạo.',
    type: 'classification',
    instruction: 'Phân loại các dấu mốc công nghiệp vào 2 thời kỳ lịch sử lớn:',
    categories: [
      { id: 'cat-early', name: 'CMCN 1.0 & 2.0 (TK XVIII - XIX)', color: 'border-orange-500/40 bg-orange-500/10 text-orange-300' },
      { id: 'cat-modern', name: 'CMCN 3.0 & 4.0 (TK XX - Hiện đại)', color: 'border-purple-500/40 bg-purple-500/10 text-purple-300' },
    ],
    items: [
      { id: 'c25', text: 'Máy dệt con thoi lò xo Cartwright (1786)', categoryId: 'cat-early', detailHint: 'CMCN lần 1' },
      { id: 'c26', text: 'Dây chuyền sản xuất ô tô Ford (1908)', categoryId: 'cat-early', detailHint: 'CMCN lần 2' },
      { id: 'c27', text: 'Động cơ hơi nước James Watt (1784)', categoryId: 'cat-early', detailHint: 'CMCN lần 1' },
      { id: 'c28', text: 'Bộ điều khiển lập trình PLC (1968)', categoryId: 'cat-modern', detailHint: 'CMCN lần 3' },
      { id: 'c29', text: 'Mạng toàn cầu Internet (1990)', categoryId: 'cat-modern', detailHint: 'CMCN lần 3' },
      { id: 'c30', text: 'Hệ thống Smart Factory & Trí tuệ AI (2011)', categoryId: 'cat-modern', detailHint: 'CMCN lần 4' },
    ]
  },
  // BÀI 6 - BỘ 2
  {
    id: 'cl-b6-s2',
    lessonId: 'bai-6',
    title: 'Phân loại Trụ cột Công nghệ: CMCN Lần 3 vs CMCN Lần 4 (Bộ 2)',
    explanation: 'Bài 6 mục 3 và 4 SGK: CMCN 3.0 tập trung vào máy tính điện tử, bóng bán dẫn bán tự động, internet sơ khai; CMCN 4.0 tập trung vào Big Data, Cloud, IoT, AI, Robot tự hành nhận thức.',
    type: 'classification',
    instruction: 'Phân loại các công nghệ sau giữa Cuộc cách mạng 3.0 và Cuộc cách mạng 4.0:',
    categories: [
      { id: 'cat-3', name: 'CMCN 3.0 (Kỷ nguyên Máy tính & CNTT)', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' },
      { id: 'cat-4', name: 'CMCN 4.0 (Kỷ nguyên Số & Trí tuệ AI)', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
    ],
    items: [
      { id: 'c31', text: 'Máy tính số ENIAC (1946)', categoryId: 'cat-3', detailHint: 'Máy tính khổng lồ của Mauchly & Eckert' },
      { id: 'c32', text: 'Bóng bán dẫn Transistor (1947)', categoryId: 'cat-3', detailHint: 'Sáng chế của Bardeen, Brattain, Shockley' },
      { id: 'c33', text: 'Máy tính cá nhân PC ra đời (1970)', categoryId: 'cat-3', detailHint: 'Đưa máy tính đến văn phòng và gia đình' },
      { id: 'c34', text: 'Dữ liệu lớn Big Data xử lý tức thời', categoryId: 'cat-4', detailHint: 'Phân tích hàng tỷ giao dịch dữ liệu số' },
      { id: 'c35', text: 'Điện toán đám mây Cloud Computing', categoryId: 'cat-4', detailHint: 'Lưu trữ tính toán phân tán không giới hạn' },
      { id: 'c36', text: 'Nhà máy thông minh kết nối 24/7', categoryId: 'cat-4', detailHint: 'Sản xuất linh hoạt hoàn toàn tự động' },
    ]
  },
  // TỔNG HỢP - BỘ 1 & BỘ 2
  {
    id: 'cl-th-s1',
    lessonId: 'tong-hop',
    title: 'Phân loại Tổng hợp: Công nghệ Truyền thống vs Công nghệ Hiện đại (Bộ 1)',
    explanation: 'Tổng hợp SGK: Công nghệ truyền thống chủ yếu cơ khí hóa và dùng năng lượng cơ bản (rèn, dập, đúc cát, hơi nước); Công nghệ hiện đại ứng dụng số hóa, tự động hóa, nano và AI.',
    type: 'classification',
    instruction: 'Phân loại các phương pháp công nghệ vào đúng nhóm phát triển:',
    categories: [
      { id: 'cat-trad', name: 'Công nghệ Cơ bản / Truyền thống', color: 'border-stone-500/40 bg-stone-500/10 text-stone-300' },
      { id: 'cat-adv', name: 'Công nghệ Cao / Đột phá Hiện đại', color: 'border-teal-500/40 bg-teal-500/10 text-teal-300' },
    ],
    items: [
      { id: 'c37', text: 'Rèn thủ công bằng búa và đe', categoryId: 'cat-trad', detailHint: 'Gia công áp lực truyền thống' },
      { id: 'c38', text: 'Đèn sợi đốt đốt nóng vonfram', categoryId: 'cat-trad', detailHint: 'Hiệu suất quang học thấp, tỏa nhiều nhiệt' },
      { id: 'c39', text: 'Gia công chi tiết trên máy tiện cơ', categoryId: 'cat-trad', detailHint: 'Công nhân quay tay gạt cơ học' },
      { id: 'c40', text: 'Cắt gọt phôi bằng chùm tia Laser CNC', categoryId: 'cat-adv', detailHint: 'Độ chính xác cực cao điều khiển bằng máy tính' },
      { id: 'c41', text: 'In 3D vật thể sinh học cấy ghép', categoryId: 'cat-adv', detailHint: 'Đắp từng lớp tế bào hoặc titan siêu nhẹ' },
      { id: 'c42', text: 'Hệ thống Robot thông minh nhận thức', categoryId: 'cat-adv', detailHint: 'Tự động né tránh vật cản và tối ưu thao tác' },
    ]
  },
  {
    id: 'cl-th-s2',
    lessonId: 'tong-hop',
    title: 'Phân loại Tổng hợp: Nguồn năng lượng trong sản xuất (Bộ 2)',
    explanation: 'Tổng hợp Bài 3 & 4: Nhiệt điện đốt than phát sinh khí thải; Thủy điện dùng thế năng nước; Điện gió & Mặt trời dùng năng lượng tái tạo; Hạt nhân phân hạch nguyên tử.',
    type: 'classification',
    instruction: 'Phân loại nguồn năng lượng đầu vào để tạo ra điện năng:',
    categories: [
      { id: 'cat-nat', name: 'Năng lượng Tự nhiên / Tái tạo', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
      { id: 'cat-conv', name: 'Năng lượng Nhiệt & Phản ứng hạt nhân', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
    ],
    items: [
      { id: 'c43', text: 'Thác nước đổ qua tua bin thủy điện', categoryId: 'cat-nat', detailHint: 'Cơ năng của dòng nước thiên nhiên' },
      { id: 'c44', text: 'Quang năng từ ánh sáng Mặt trời', categoryId: 'cat-nat', detailHint: 'Tạo dòng điện một chiều trong pin mặt trời' },
      { id: 'c45', text: 'Sức gió đẩy cánh quạt phong điện', categoryId: 'cat-nat', detailHint: 'Quay máy phát điện trên không' },
      { id: 'c46', text: 'Nhiệt đốt cháy than đá đun sôi nước', categoryId: 'cat-conv', detailHint: 'Tạo hơi nước áp suất cao làm quay tuabin' },
      { id: 'c47', text: 'Năng lượng phân hạch hạt nhân Uranium', categoryId: 'cat-conv', detailHint: 'Phản ứng tỏa nhiệt lượng khổng lồ' },
      { id: 'c48', text: 'Khí gas thiên nhiên đốt buồng khí tuabin', categoryId: 'cat-conv', detailHint: 'Nhiệt điện tua bin khí chu trình hỗn hợp' },
    ]
  }
];
