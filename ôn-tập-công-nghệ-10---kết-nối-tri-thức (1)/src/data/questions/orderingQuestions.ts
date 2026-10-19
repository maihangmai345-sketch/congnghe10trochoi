import { OrderingQuestionSet } from '../../types/game';

export const ORDERING_QUESTIONS: OrderingQuestionSet[] = [
  // BÀI 3 - BỘ 1
  {
    id: 'ord-b3-s1',
    lessonId: 'bai-3',
    title: 'Sắp xếp: Tiến trình phát triển Công nghệ Điện - Quang (Bộ 1)',
    explanation: 'Hình 3.9 SGK trang 20: Đèn sợi đốt phát minh năm 1879 -> Đèn phóng điện (huỳnh quang) năm 1934 -> Đèn LED năm 2006.',
    type: 'ordering',
    instruction: 'Kéo và sắp xếp các loại bóng đèn chiếu sáng theo đúng mốc thời gian xuất hiện trong lịch sử:',
    steps: [
      { id: 's1', text: 'Bóng đèn sợi đốt (Năm 1879 - Thomas Edison)', correctIndex: 0, hint: 'Dòng điện qua sợi đốt nung đỏ phát sáng' },
      { id: 's2', text: 'Bóng đèn phóng điện / huỳnh quang (Năm 1934)', correctIndex: 1, hint: 'Phóng điện kích hoạt bột huỳnh quang phát sáng' },
      { id: 's3', text: 'Bóng đèn phát quang LED (Năm 2006)', correctIndex: 2, hint: 'Đi-ốt phát quang bán dẫn hiện đại, tiết kiệm điện' },
    ]
  },
  // BÀI 3 - BỘ 2
  {
    id: 'ord-b3-s2',
    lessonId: 'bai-3',
    title: 'Sắp xếp: Quy trình Công nghệ Đúc kim loại (Bộ 2)',
    explanation: 'Bài 3 mục 2 SGK: Chuẩn bị mẫu và khuôn đúc -> Nấu kim loại thành trạng thái lỏng -> Rót kim loại lỏng vào khuôn -> Để kim loại nguội và đông đặc -> Dỡ khuôn và làm sạch phôi đúc.',
    type: 'ordering',
    instruction: 'Sắp xếp các bước thực hiện đúng quy trình công nghệ đúc chi tiết kim loại:',
    steps: [
      { id: 's4', text: 'Bước 1: Chế tạo mẫu và tạo lòng khuôn đúc chuẩn kích thước', correctIndex: 0, hint: 'Chuẩn bị khuôn cát hoặc khuôn kim loại' },
      { id: 's5', text: 'Bước 2: Nung nóng kim loại nguyên liệu thành trạng thái lỏng', correctIndex: 1, hint: 'Đưa vào lò nấu chảy ở nhiệt độ cao' },
      { id: 's6', text: 'Bước 3: Rót kim loại lỏng vào trong lòng khuôn', correctIndex: 2, hint: 'Rót đều tay, tránh rỗ khí' },
      { id: 's7', text: 'Bước 4: Kim loại nguội dần và đông đặc theo hình dạng khuôn', correctIndex: 3, hint: 'Chuyển từ pha lỏng sang pha rắn' },
      { id: 's8', text: 'Bước 5: Dỡ khuôn, cắt bỏ đậu ngót và làm sạch bề mặt phôi đúc', correctIndex: 4, hint: 'Thu được vật đúc thô hoàn chỉnh' },
    ]
  },
  // BÀI 4 - BỘ 1
  {
    id: 'ord-b4-s1',
    lessonId: 'bai-4',
    title: 'Sắp xếp: Chuỗi các bước thực hiện gia công CAD/CAM/CNC (Bộ 1)',
    explanation: 'Hình 4.3 SGK trang 24: Ý tưởng cho chi tiết -> Phần mềm CAD (Mô hình thiết kế trên máy tính) -> Phần mềm CAM (Quy trình công nghệ gia công trên máy tính) -> Máy CNC -> Chi tiết thực.',
    type: 'ordering',
    instruction: 'Sắp xếp 5 giai đoạn theo đúng sơ đồ khối quy trình CAD/CAM/CNC trong SGK:',
    steps: [
      { id: 's9', text: '1. Ý tưởng thiết kế ban đầu cho chi tiết', correctIndex: 0, hint: 'Xác định hình dạng và kích thước mong muốn' },
      { id: 's10', text: '2. Dùng phần mềm CAD dựng mô hình thiết kế 3D trên máy tính', correctIndex: 1, hint: 'Computer Aided Design' },
      { id: 's11', text: '3. Dùng phần mềm CAM lập quy trình công nghệ gia công', correctIndex: 2, hint: 'Computer Aided Manufacturing' },
      { id: 's12', text: '4. Chuyển chương trình điều khiển số sang máy CNC', correctIndex: 3, hint: 'Computer Numerical Control' },
      { id: 's13', text: '5. Máy CNC cắt gọt tự động hoàn thiện chi tiết thực', correctIndex: 4, hint: 'Sản phẩm cơ khí chính xác ra đời' },
    ]
  },
  // BÀI 4 - BỘ 2
  {
    id: 'ord-b4-s2',
    lessonId: 'bai-4',
    title: 'Sắp xếp: Nguyên lý tạo hình bằng Công nghệ In 3D (Bộ 2)',
    explanation: 'Bài 4 mục 3 SGK trang 25: Thiết kế mô hình 3D trên máy tính -> Phân tách mô hình 3D thành các lớp 2D liên tiếp -> Máy in nạp vật liệu và đắp từng lớp tuần tự xếp chồng lên nhau -> Hoàn thiện sản phẩm.',
    type: 'ordering',
    instruction: 'Sắp xếp theo thứ tự nguyên lý tạo hình của công nghệ in 3D (Additive Manufacturing):',
    steps: [
      { id: 's14', text: 'Tạo dựng mô hình vật thể dạng 3 chiều (3D Model)', correctIndex: 0, hint: 'Thiết kế kỹ thuật số trên phần mềm máy tính' },
      { id: 's15', text: 'Phần mềm cắt lớp phân tách mô hình 3D thành các lớp 2D siêu mỏng', correctIndex: 1, hint: 'Quy trình Slicing tạo dữ liệu lát cắt' },
      { id: 's16', text: 'Đầu đùn/tia laser đắp dần lớp vật liệu đầu tiên lên bàn in', correctIndex: 2, hint: 'Bắt đầu từ đáy vật thể' },
      { id: 's17', text: 'Lần lượt đắp các lớp 2D tiếp theo xếp chồng tuần tự lên nhau', correctIndex: 3, hint: 'Các lớp kết dính chặt chẽ tạo thành khối' },
      { id: 's18', text: 'Tách sản phẩm khỏi bàn in và xử lý bề mặt nhẵn bóng', correctIndex: 4, hint: 'Sản phẩm 3D hoàn chỉnh sẵn sàng sử dụng' },
    ]
  },
  // BÀI 6 - BỘ 1
  {
    id: 'ord-b6-s1',
    lessonId: 'bai-6',
    title: 'Sắp xếp: Tiến trình 4 Cuộc Cách mạng Công nghiệp (Bộ 1)',
    explanation: 'Bài 6 SGK: Cuộc CMCN lần 1 (cuối TK XVIII) -> CMCN lần 2 (cuối TK XIX) -> CMCN lần 3 (những năm 70 TK XX) -> CMCN lần 4 (từ 2011 đến nay).',
    type: 'ordering',
    instruction: 'Sắp xếp 4 cuộc cách mạng công nghiệp theo tiến trình lịch sử từ cổ điển tới hiện đại:',
    steps: [
      { id: 's19', text: 'CMCN lần thứ nhất (1.0): Động cơ hơi nước và Cơ giới hóa tại Anh', correctIndex: 0, hint: 'Cuối thế kỉ XVIII' },
      { id: 's20', text: 'CMCN lần thứ hai (2.0): Năng lượng điện và Dây chuyền sản xuất hàng loạt', correctIndex: 1, hint: 'Cuối thế kỉ XIX' },
      { id: 's21', text: 'CMCN lần thứ ba (3.0): Công nghệ thông tin, Máy tính điện tử và Tự động hóa', correctIndex: 2, hint: 'Những năm 70 thế kỉ XX' },
      { id: 's22', text: 'CMCN lần thứ tư (4.0): Công nghệ số, Internet vạn vật (IoT), Big Data và Trí tuệ AI', correctIndex: 3, hint: 'Thế kỉ XXI - Khởi xướng năm 2011 tại Đức' },
    ]
  },
  // BÀI 6 - BỘ 2
  {
    id: 'ord-b6-s2',
    lessonId: 'bai-6',
    title: 'Sắp xếp: Trình tự thời gian các phát minh vĩ đại (Bộ 2)',
    explanation: 'Mục Thông tin bổ sung SGK trang 34-36: Henry Cort luyện cán thép (1783) -> James Watt động cơ hơi nước (1784) -> Edmund Cartwright máy dệt con thoi lò xo (1786) -> Robert Fulton tàu thủy hơi nước (1807) -> George Stephenson xe lửa hơi nước (1814).',
    type: 'ordering',
    instruction: 'Sắp xếp các sáng chế trong Cách mạng Công nghiệp lần thứ nhất theo thứ tự năm ra đời:',
    steps: [
      { id: 's23', text: 'Năm 1783: Henry Cort sáng chế máy cán thép', correctIndex: 0, hint: 'Cải tiến vượt bậc ngành luyện kim' },
      { id: 's24', text: 'Năm 1784: James Watt sáng chế động cơ hơi nước vạn năng', correctIndex: 1, hint: 'Đột phá năng lượng cơ học' },
      { id: 's25', text: 'Năm 1786: Edmund Cartwright chế tạo máy dệt vải cải tiến', correctIndex: 2, hint: 'Có con thoi chuyển động bằng lò xo' },
      { id: 's26', text: 'Năm 1807: Robert Fulton chế tạo tàu thuỷ chạy bằng hơi nước', correctIndex: 3, hint: 'Cách mạng giao thông đường thuỷ' },
      { id: 's27', text: 'Năm 1814: George Stephenson phát minh đầu máy xe lửa hơi nước', correctIndex: 4, hint: 'Cách mạng giao thông đường sắt' },
    ]
  },
  // TỔNG HỢP - BỘ 1 & BỘ 2
  {
    id: 'ord-th-s1',
    lessonId: 'tong-hop',
    title: 'Sắp xếp Tổng hợp: Tiến hóa từ Sản xuất Thủ công đến Nhà máy Thông minh (Bộ 1)',
    explanation: 'Tổng hợp cả 3 bài: Lao động thủ công -> Máy chạy bằng hơi nước -> Dây chuyền điện khí hóa -> Tự động hóa bằng máy tính/PLC -> Nhà máy thông minh Smart Factory.',
    type: 'ordering',
    instruction: 'Sắp xếp các nấc thang phát triển của nền sản xuất loài người:',
    steps: [
      { id: 's28', text: 'Nền sản xuất nông nghiệp nhỏ lẻ, dùng sức kéo động vật và cơ bắp người', correctIndex: 0, hint: 'Thời kỳ tiền công nghiệp' },
      { id: 's29', text: 'Sử dụng động cơ hơi nước cơ giới hóa các xưởng dệt và mỏ than', correctIndex: 1, hint: 'CMCN lần thứ nhất' },
      { id: 's30', text: 'Lắp ráp theo băng chuyền chuyên môn hóa chạy bằng động cơ điện', correctIndex: 2, hint: 'CMCN lần thứ hai' },
      { id: 's31', text: 'Điều khiển máy móc bằng vi mạch máy tính và bộ lập trình PLC', correctIndex: 3, hint: 'CMCN lần thứ ba' },
      { id: 's32', text: 'Nhà máy thông minh kết nối mạng cảm biến IoT và robot AI hoạt động 24/7', correctIndex: 4, hint: 'CMCN lần thứ tư' },
    ]
  },
  {
    id: 'ord-th-s2',
    lessonId: 'tong-hop',
    title: 'Sắp xếp Tổng hợp: Mốc son của ngành Công nghệ Thông tin & Số hóa (Bộ 2)',
    explanation: 'Bài 6 SGK: ENIAC (1946) -> Transistor (1947) -> Máy tính cá nhân (1970) -> Internet (1990) -> Thuật ngữ Công nghiệp 4.0 tại Đức (2011).',
    type: 'ordering',
    instruction: 'Sắp xếp các mốc son công nghệ số theo trật tự thời gian chính xác:',
    steps: [
      { id: 's33', text: 'Hoàn thành máy tính số điện tử đầu tiên ENIAC (1946)', correctIndex: 0, hint: 'Khai sinh kỷ nguyên điện toán' },
      { id: 's34', text: 'Sáng chế bóng bán dẫn Transistor của Bardeen, Brattain, Shockley (1947)', correctIndex: 1, hint: 'Nền tảng của vi mạch hiện đại' },
      { id: 's35', text: 'Máy tính cá nhân (PC) ra đời phục vụ người dùng (1970)', correctIndex: 2, hint: 'Máy tính bước vào đời sống' },
      { id: 's36', text: 'Mạng Internet toàn cầu bắt đầu phổ cập thương mại (1990)', correctIndex: 3, hint: 'Kết nối mạng máy tính thế giới' },
      { id: 's37', text: 'Thuật ngữ "Công nghiệp 4.0" lần đầu được sử dụng tại Đức (2011)', correctIndex: 4, hint: 'Mở đầu cuộc CMCN 4.0' },
    ]
  }
];
