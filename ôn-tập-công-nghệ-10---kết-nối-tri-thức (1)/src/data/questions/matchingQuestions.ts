import { MatchingQuestionSet } from '../../types/game';

export const MATCHING_QUESTIONS: MatchingQuestionSet[] = [
  // BÀI 3 - BỘ 1
  {
    id: 'm-b3-s1',
    lessonId: 'bai-3',
    title: 'Ghép đôi Công nghệ Phổ biến (Bộ 1 - Lĩnh vực Cơ khí & Luyện kim)',
    explanation: 'Bài 3 SGK Công nghệ 10: Luyện kim điều chế gang thép; Đúc rót kim loại lỏng vào khuôn; Cắt gọt lấy đi phần kim loại dưới dạng phoi; Gia công áp lực cán, kéo, rèn, dập.',
    type: 'matching',
    pairs: [
      {
        id: 'p1',
        term: 'Công nghệ luyện kim',
        description: 'Điều chế kim loại đen (gang, thép) và kim loại màu từ quặng trong lò cao',
        iconName: 'Flame'
      },
      {
        id: 'p2',
        term: 'Công nghệ đúc kim loại',
        description: 'Nấu kim loại thành trạng thái lỏng rồi rót vào khuôn để tạo phôi hoặc chi tiết',
        iconName: 'Box'
      },
      {
        id: 'p3',
        term: 'Công nghệ gia công cắt gọt',
        description: 'Lấy đi một phần kim loại dưới dạng phoi (tiện, phay, bào, mài, tia laser)',
        iconName: 'Scissors'
      },
      {
        id: 'p4',
        term: 'Công nghệ gia công áp lực',
        description: 'Dựa vào tính dẻo kim loại, dùng ngoại lực làm biến dạng (cán, kéo, rèn, dập)',
        iconName: 'Hammer'
      },
      {
        id: 'p5',
        term: 'Công nghệ hàn',
        description: 'Nối các chi tiết kim loại thành khối không thể tháo rời bằng nung chảy hoặc áp lực',
        iconName: 'Zap'
      }
    ]
  },
  // BÀI 3 - BỘ 2
  {
    id: 'm-b3-s2',
    lessonId: 'bai-3',
    title: 'Ghép đôi Công nghệ Phổ biến (Bộ 2 - Lĩnh vực Điện & Điện tử)',
    explanation: 'Bài 3 SGK: Sản xuất điện chuyển cơ/nhiệt/quang thành điện; Điện-quang chuyển điện thành ánh sáng; Điện-cơ chuyển điện thành cơ năng; Truyền thông không dây dùng sóng điện từ.',
    type: 'matching',
    pairs: [
      {
        id: 'p6',
        term: 'Sản xuất điện năng',
        description: 'Biến đổi các dạng năng lượng nước, gió, mặt trời, hạt nhân thành điện năng',
        iconName: 'Zap'
      },
      {
        id: 'p7',
        term: 'Công nghệ Điện - Quang',
        description: 'Biến đổi điện năng thành quang năng (đèn sợi đốt 1879, huỳnh quang 1934, đèn LED 2006)',
        iconName: 'Lightbulb'
      },
      {
        id: 'p8',
        term: 'Công nghệ Điện - Cơ',
        description: 'Biến điện năng thành cơ năng: dạng quay (quạt, máy bơm) hoặc tịnh tiến (rơ le, van từ)',
        iconName: 'Cog'
      },
      {
        id: 'p9',
        term: 'Điều khiển & Tự động hoá',
        description: 'Vận hành các dây chuyền sản xuất tự động, thay thế thao tác con người, giảm chi phí',
        iconName: 'Cpu'
      },
      {
        id: 'p10',
        term: 'Truyền thông không dây',
        description: 'Truyền tải thông tin qua sóng điện từ không cần dây dẫn (Wi-Fi, Bluetooth, mạng di động)',
        iconName: 'Radio'
      }
    ]
  },
  // BÀI 4 - BỘ 1
  {
    id: 'm-b4-s1',
    lessonId: 'bai-4',
    title: 'Ghép đôi Công nghệ Mới (Bộ 1 - Công nghệ Tiên phong)',
    explanation: 'Bài 4 SGK: Công nghệ nano (1-100 nm); CAD/CAM/CNC kết nối thiết kế đến máy gia công số; In 3D đắp chồng từng lớp vật liệu 2D.',
    type: 'matching',
    pairs: [
      {
        id: 'p11',
        term: 'Công nghệ Nano',
        description: 'Vật liệu kích thước siêu nhỏ từ 1 đến 100 nm (nano bạc diệt khuẩn, thuốc tiêu diệt ung thư)',
        iconName: 'Atom'
      },
      {
        id: 'p12',
        term: 'Công nghệ CAD/CAM/CNC',
        description: 'Thiết kế máy tính (CAD) chuyển sang quy trình gia công (CAM) và máy số thực thi (CNC)',
        iconName: 'Monitor'
      },
      {
        id: 'p13',
        term: 'Công nghệ in 3D',
        description: 'Phân tách mô hình 3D thành các lớp 2D xếp chồng lên nhau, đắp dần vật liệu tuần tự',
        iconName: 'Layers'
      },
      {
        id: 'p14',
        term: 'Năng lượng tái tạo',
        description: 'Khai thác nguồn năng lượng vô hạn, ít gây ô nhiễm (năng lượng mặt trời, gió, địa nhiệt)',
        iconName: 'Sun'
      }
    ]
  },
  // BÀI 4 - BỘ 2
  {
    id: 'm-b4-s2',
    lessonId: 'bai-4',
    title: 'Ghép đôi Công nghệ Mới (Bộ 2 - Trí tuệ số & Kết nối)',
    explanation: 'Bài 4 SGK: AI mô phỏng trí tuệ con người; IoT kết nối vạn vật qua internet do Kevin Ashton đưa ra năm 1999; Robot thông minh có bộ não AI nhận thức môi trường.',
    type: 'matching',
    pairs: [
      {
        id: 'p15',
        term: 'Trí tuệ nhân tạo (AI)',
        description: 'Mô phỏng hoạt động trí tuệ của con người bằng máy tính: tự động hóa tư duy, chẩn đoán, xe tự lái',
        iconName: 'Bot'
      },
      {
        id: 'p16',
        term: 'Internet vạn vật (IoT)',
        description: 'Mạng lưới kết nối, thu thập và trao đổi dữ liệu giữa mọi thiết bị thông minh qua internet',
        iconName: 'Wifi'
      },
      {
        id: 'p17',
        term: 'Robot thông minh',
        description: 'Robot trang bị "bộ não" AI, có khả năng nhận thức môi trường và tự đưa ra quyết định',
        iconName: 'Cpu'
      },
      {
        id: 'p18',
        term: 'Địa nhiệt & Thủy triều',
        description: 'Các nguồn năng lượng tái tạo sạch khai thác nhiệt lượng lòng đất và chuyển động sóng biển',
        iconName: 'Waves'
      }
    ]
  },
  // BÀI 6 - BỘ 1
  {
    id: 'm-b6-s1',
    lessonId: 'bai-6',
    title: 'Ghép đôi Cách mạng Công nghiệp (Bộ 1 - Mốc lịch sử & Đặc trưng)',
    explanation: 'Bài 6 SGK: CMCN 1.0 (cuối TK XVIII) - Cơ giới hóa & động cơ hơi nước; CMCN 2.0 (cuối TK XIX) - Điện năng & sản xuất hàng loạt; CMCN 3.0 (những năm 70 TK XX) - CNTT & tự động hóa; CMCN 4.0 - Công nghệ số, kết nối & AI.',
    type: 'matching',
    pairs: [
      {
        id: 'p19',
        term: 'CMCN lần thứ nhất (1.0)',
        description: 'Cuối TK XVIII tại Anh: Đặc trưng là động cơ hơi nước và cơ giới hóa sản xuất',
        iconName: 'Train'
      },
      {
        id: 'p20',
        term: 'CMCN lần thứ hai (2.0)',
        description: 'Cuối TK XIX: Đặc trưng là năng lượng điện, động cơ đốt trong và dây chuyền sản xuất hàng loạt',
        iconName: 'Factory'
      },
      {
        id: 'p21',
        term: 'CMCN lần thứ ba (3.0)',
        description: 'Những năm 70 thế kỉ XX: Đặc trưng là công nghệ thông tin, máy tính và tự động hóa',
        iconName: 'Monitor'
      },
      {
        id: 'p22',
        term: 'CMCN lần thứ tư (4.0)',
        description: 'Bắt đầu từ thế kỉ XXI: Đặc trưng là công nghệ số, Internet vạn vật (IoT), Big Data và AI',
        iconName: 'Globe'
      }
    ]
  },
  // BÀI 6 - BỘ 2
  {
    id: 'm-b6-s2',
    lessonId: 'bai-6',
    title: 'Ghép đôi Cách mạng Công nghiệp (Bộ 2 - Phát minh tiêu biểu & Tác giả)',
    explanation: 'Bài 6 SGK: James Watt (1784) sáng chế động cơ hơi nước; Thomas Edison (1882) mở nhà máy điện; Henry Ford (1908) dây chuyền lắp ráp ô tô; ENIAC (1946) máy tính điện tử đầu tiên.',
    type: 'matching',
    pairs: [
      {
        id: 'p23',
        term: 'Động cơ hơi nước (1784)',
        description: 'Phát minh vĩ đại của James Watt mở đầu kỷ nguyên cơ giới hóa trong CMCN lần 1',
        iconName: 'Flame'
      },
      {
        id: 'p24',
        term: 'Nhà máy điện thương mại (1882)',
        description: 'Công trình của Thomas Edison khai mở kỷ nguyên điện khí hóa trong CMCN lần 2',
        iconName: 'Zap'
      },
      {
        id: 'p25',
        term: 'Dây chuyền lắp ráp ô tô (1908)',
        description: 'Hãng Ford Motor áp dụng thành công phương thức sản xuất hàng loạt quy mô lớn',
        iconName: 'Car'
      },
      {
        id: 'p26',
        term: 'Máy tính ENIAC (1946)',
        description: 'Máy tính số điện tử đầu tiên trên thế giới của Mauchly và Eckert trong CMCN lần 3',
        iconName: 'Server'
      }
    ]
  },
  // TỔNG HỢP - BỘ 1 & BỘ 2
  {
    id: 'm-th-s1',
    lessonId: 'tong-hop',
    title: 'Ghép đôi Tổng hợp Toàn diện (Bộ 1 - Khái niệm cốt lõi Bài 3, 4, 6)',
    explanation: 'Tổng hợp kiến thức SGK: Đúc rót kim loại lỏng; In 3D bồi đắp từng lớp; Smart Factory kết nối dữ liệu 24/7; Động cơ hơi nước khởi nguồn CMCN 1.0.',
    type: 'matching',
    pairs: [
      {
        id: 'p27',
        term: 'Đúc kim loại (Bài 3)',
        description: 'Nấu kim loại lỏng rót vào khuôn có hình dạng của chi tiết',
        iconName: 'Box'
      },
      {
        id: 'p28',
        term: 'Công nghệ in 3D (Bài 4)',
        description: 'Kỹ thuật in đắp dần từng lớp 2D xếp chồng lên nhau thành vật thể 3 chiều',
        iconName: 'Layers'
      },
      {
        id: 'p29',
        term: 'Smart Factory (Bài 6)',
        description: 'Nhà máy thông minh vận hành tự động 24/7, liên kết IoT và Big Data trong CMCN 4.0',
        iconName: 'Building'
      },
      {
        id: 'p30',
        term: 'Máy dệt Edmund Cartwright (Bài 6)',
        description: 'Máy dệt cải tiến con thoi lò xo năm 1786 nâng cao năng suất dệt vải thời CMCN 1.0',
        iconName: 'Scissors'
      }
    ]
  },
  {
    id: 'm-th-s2',
    lessonId: 'tong-hop',
    title: 'Ghép đôi Tổng hợp Toàn diện (Bộ 2 - Sản phẩm & Ứng dụng thực tiễn)',
    explanation: 'Tổng hợp SGK: Hạt nano bạc kháng khuẩn; Đèn LED tiết kiệm điện năng; Bộ PLC điều khiển công nghiệp; Rơ le biến đổi điện - cơ tịnh tiến.',
    type: 'matching',
    pairs: [
      {
        id: 'p31',
        term: 'Hạt Nano bạc (Bài 4)',
        description: 'Khả năng tiêu diệt vi khuẩn được tích hợp vào sợi vải dệt may và khẩu trang y tế',
        iconName: 'Shield'
      },
      {
        id: 'p32',
        term: 'Rơ le điện từ (Bài 3)',
        description: 'Thiết bị điện - cơ dạng tịnh tiến dùng tín hiệu điện nhỏ điều khiển mạch điện lớn',
        iconName: 'ToggleRight'
      },
      {
        id: 'p33',
        term: 'Bộ điều khiển PLC (Bài 6)',
        description: 'Sáng chế của General Motors năm 1968 đưa tự động hóa sản xuất lên tầm cao mới',
        iconName: 'Cpu'
      },
      {
        id: 'p34',
        term: 'Đèn phát quang LED (Bài 3)',
        description: 'Chuyển trực tiếp dòng điện một chiều qua diode thành quang năng, hiệu suất rất cao',
        iconName: 'Sun'
      }
    ]
  }
];
