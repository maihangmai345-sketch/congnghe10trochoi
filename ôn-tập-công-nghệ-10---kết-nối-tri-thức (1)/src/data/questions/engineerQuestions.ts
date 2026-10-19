import { EngineerScenarioQuestion } from '../../types/game';

export const ENGINEER_QUESTIONS: EngineerScenarioQuestion[] = [
  // BÀI 3 - BỘ 1
  {
    id: 'eng-b3-s1-1',
    lessonId: 'bai-3',
    title: 'Tình huống 1: Chế tạo chi tiết trục máy phức tạp có rãnh then',
    explanation: 'Bài 3 mục 3 SGK trang 16: Công nghệ gia công cắt gọt (tiện, phay, bào, mài) giúp bóc tách kim loại tạo thành phoi để đạt độ chính xác kích thước và độ nhẵn bề mặt rất cao cho các chi tiết máy cơ khí.',
    type: 'engineer',
    role: 'Kỹ sư Chế tạo máy tại Nhà máy Cơ khí',
    scenario: 'Khách hàng đặt hàng chế tạo 500 trục truyền động cho động cơ xe tải. Yêu cầu kỹ thuật: độ đồng tâm cao, độ nhẵn bóng bề mặt cao và có rãnh then then hoa với độ chính xác đến từng micromet. Bạn sẽ chỉ đạo xưởng áp dụng công nghệ nào?',
    options: [
      {
        id: 'opt1',
        text: 'Sử dụng công nghệ Gia công cắt gọt (Tiện tròn chính xác kết hợp Phay rãnh then và Mài bóng)',
        isCorrect: true,
        engineerFeedback: 'Chính xác! Gia công cắt gọt (tiện trục, phay rãnh, mài tinh) là giải pháp tối ưu nhất để đạt độ chính xác kích thước và độ bóng bề mặt cao theo yêu cầu khắt khe của chi tiết máy.'
      },
      {
        id: 'opt2',
        text: 'Đúc khuôn cát và để nguyên bề mặt không cần qua gia công cơ khí',
        isCorrect: false,
        engineerFeedback: 'Sai lầm kỹ thuật! Đúc khuôn cát có bề mặt nhám xơ, sai số kích thước lớn, không thể đáp ứng độ nhẵn và rãnh then chính xác của trục máy.'
      },
      {
        id: 'opt3',
        text: 'Nung chảy kim loại rồi hàn nối các thanh thép rời lại với nhau',
        isCorrect: false,
        engineerFeedback: 'Không khả thi! Mối hàn có ứng suất nhiệt dư, dễ bị cong vênh và nứt gãy khi chịu tải xoắn lớn của trục truyền động.'
      },
      {
        id: 'opt4',
        text: 'Chỉ dùng phương pháp rèn tự do bằng tay để định hình trục',
        isCorrect: false,
        engineerFeedback: 'Không phù hợp! Rèn tự do chỉ tạo phôi thô với sai số lớn, không thể tạo được rãnh then hoa tinh xảo và bề mặt nhẵn bóng.'
      }
    ],
    realWorldImpact: 'Ứng dụng trong ngành công nghiệp phụ trợ ô tô, đóng tàu và chế tạo máy bay.'
  },
  {
    id: 'eng-b3-s1-2',
    lessonId: 'bai-3',
    title: 'Tình huống 2: Lựa chọn vật liệu và phương pháp cho vỏ động cơ máy bơm',
    explanation: 'Bài 3 mục 2 SGK trang 15: Công nghệ đúc kim loại chế tạo sản phẩm bằng cách rót kim loại lỏng vào khuôn. Đúc có thể tạo được các chi tiết có hình dạng phức tạp như thân máy công cụ, vỏ động cơ,... mà gia công cắt gọt rất khó hoặc tốn kém.',
    type: 'engineer',
    role: 'Kỹ sư Trưởng Xưởng Đúc kim loại',
    scenario: 'Xưởng cần sản xuất hàng loạt vỏ máy bơm nước công nghiệp có các khoang chứa nước, cánh tản nhiệt phức tạp và thành vỏ uốn lượn. Phương án nào tối ưu nhất về chi phí và tính khả thi?',
    options: [
      {
        id: 'opt1',
        text: 'Đúc kim loại (dùng khuôn kim loại hoặc khuôn cát tạo hình liền khối)',
        isCorrect: true,
        engineerFeedback: 'Xuất sắc! Vỏ động cơ máy bơm có các khoang rỗng và cánh tản nhiệt phức tạp nên phương pháp đúc kim loại là giải pháp kinh tế và nhanh nhất để tạo hình sản phẩm nguyên khối.'
      },
      {
        id: 'opt2',
        text: 'Dùng máy phay gọt từ một khối kim loại đặc nguyên khối hình lập phương',
        isCorrect: false,
        engineerFeedback: 'Quá lãng phí! Phay từ phôi đặc sẽ tạo lượng phoi thải cực lớn, tốn dao cụ và thời gian gia công đắt đỏ gấp nhiều lần.'
      },
      {
        id: 'opt3',
        text: 'Hàn ghép hàng trăm miếng tôn mỏng lại thành vỏ máy',
        isCorrect: false,
        engineerFeedback: 'Không an toàn! Quá nhiều đường hàn sẽ làm vỏ máy dễ bị rò rỉ nước áp lực cao và mất tính thẩm mỹ.'
      },
      {
        id: 'opt4',
        text: 'Kéo kim loại qua lỗ khuôn tròn',
        isCorrect: false,
        engineerFeedback: 'Sai công nghệ! Kéo kim loại chỉ dùng để chế tạo dây kim loại hoặc ống dài không hạn chế, không tạo được vỏ động cơ có khoang.'
      }
    ],
    realWorldImpact: 'Giảm 60% giá thành phôi và tăng độ cứng vững giảm rung động cho máy bơm nước.'
  },
  // BÀI 3 - BỘ 2
  {
    id: 'eng-b3-s2-1',
    lessonId: 'bai-3',
    title: 'Tình huống 3: Thiết kế hệ thống đóng ngắt van xả tự động trong nhà máy',
    explanation: 'Bài 3 mục II.3 SGK trang 20: Công nghệ điện - cơ biến đổi điện năng thành cơ năng dạng tịnh tiến (như van điện từ, relay/rơ le) được dùng rộng rãi để điều khiển đường ống chất lỏng và mạch điện tự động.',
    type: 'engineer',
    role: 'Kỹ sư Tự động hoá & Thiết bị Điện',
    scenario: 'Trong nhà máy chế biến thực phẩm, khi cảm biến báo bể chứa sữa đã đầy 100%, hệ thống cần kích hoạt một thiết bị cơ học để đóng lập tức đường ống dẫn chất lỏng mà không cần công nhân vặn van tay. Bạn đề xuất thiết bị nào?',
    options: [
      {
        id: 'opt1',
        text: 'Van điện từ (Solenoid Valve) - Công nghệ Điện - Cơ dạng tịnh tiến',
        isCorrect: true,
        engineerFeedback: 'Rất chính xác! Van điện từ biến tín hiệu điện năng thành chuyển động tịnh tiến hút/đẩy lõi thép để đóng ngắt tức thì đường ống chất lỏng hoàn toàn tự động.'
      },
      {
        id: 'opt2',
        text: 'Lắp một bóng đèn huỳnh quang công suất lớn để làm bay hơi sữa dư',
        isCorrect: false,
        engineerFeedback: 'Hoàn toàn sai lầm! Đèn huỳnh quang chỉ biến điện thành ánh sáng chiếu sáng, không tạo ra lực cơ học để đóng mở đường ống.'
      },
      {
        id: 'opt3',
        text: 'Lắp thêm một động cơ quạt gió để thổi nguội',
        isCorrect: false,
        engineerFeedback: 'Không đúng! Quạt điện tạo ra chuyển động quay gió, không có chức năng chặn kín đường ống chất lỏng.'
      },
      {
        id: 'opt4',
        text: 'Sử dụng que hàn nung chảy bít kín đầu ống lại vĩnh viễn',
        isCorrect: false,
        engineerFeedback: 'Vô lý! Bịt kín vĩnh viễn sẽ phá hỏng dây chuyền và không thể mở lại cho mẻ sản xuất tiếp theo.'
      }
    ],
    realWorldImpact: 'Ứng dụng trong tự động hóa nhà máy nước sạch, dầu khí và thực phẩm an toàn.'
  },
  {
    id: 'eng-b3-s2-2',
    lessonId: 'bai-3',
    title: 'Tình huống 4: Nâng cấp giải pháp chiếu sáng tiết kiệm năng lượng cho trường học',
    explanation: 'Bài 3 mục II.2 SGK trang 20: Đèn LED (2006) hoạt động dựa trên nguyên lí chuyển trực tiếp từ điện năng thành quang năng khi có dòng điện một chiều chạy qua diode, có tuổi thọ cao và tiết kiệm điện năng vượt trội so với đèn sợi đốt và đèn huỳnh quang.',
    type: 'engineer',
    role: 'Kỹ sư Năng lượng & Công trình xanh',
    scenario: 'Trường học của bạn đang sử dụng hệ thống đèn sợi đốt cũ tiêu hao nhiều điện và tỏa nhiệt nóng bức mùa hè. Ban Giám hiệu yêu cầu thay thế bằng giải pháp chiếu sáng hiện đại, thân thiện thị lực học sinh và tiết kiệm tiền điện tối đa. Phương án của bạn?',
    options: [
      {
        id: 'opt1',
        text: 'Thay toàn bộ bằng hệ thống đèn LED (Light Emitting Diode) chuẩn quang thông học đường',
        isCorrect: true,
        engineerFeedback: 'Lựa chọn chuẩn xác của kỹ sư! Đèn LED tiêu thụ điện ít hơn 80% so với đèn sợi đốt, không tỏa nhiệt bức xạ nhiệt hồng ngoại lớn và có tuổi thọ gấp 10-20 lần.'
      },
      {
        id: 'opt2',
        text: 'Nâng công suất bóng đèn sợi đốt lên gấp đôi để học sinh nhìn rõ hơn',
        isCorrect: false,
        engineerFeedback: 'Rất nguy hiểm và tốn kém! Đèn sợi đốt biến 95% điện năng thành nhiệt năng, sẽ làm phòng học cực kỳ nóng và hóa đơn tiền điện tăng vọt.'
      },
      {
        id: 'opt3',
        text: 'Tháo bỏ toàn bộ đèn điện và chỉ học vào ban ngày',
        isCorrect: false,
        engineerFeedback: 'Không khả thi vào những ngày trời mưa bão âm u hoặc các buổi học chiều muộn.'
      },
      {
        id: 'opt4',
        text: 'Chuyển sang dùng máy phát điện chạy than đá đặt ngay trong lớp học',
        isCorrect: false,
        engineerFeedback: 'Nguy hiểm chết người do khí độc CO và tiếng ồn khói bụi!'
      }
    ],
    realWorldImpact: 'Giúp các trường học tiết kiệm hàng chục triệu đồng tiền điện mỗi tháng và bảo vệ môi trường.'
  },
  // BÀI 4 - BỘ 1
  {
    id: 'eng-b4-s1-1',
    lessonId: 'bai-4',
    title: 'Tình huống 5: Tái tạo xương khớp hàm nhân tạo cho bệnh nhân phẫu thuật',
    explanation: 'Bài 4 mục 3 SGK trang 25: Công nghệ in 3D được ứng dụng rộng rãi trong y học (như in xương nhân tạo, khớp nhân tạo tương thích sinh học cao) bằng cách đắp vật liệu theo từng lớp chuẩn xác với dữ liệu quét cắt lớp 3D của bệnh nhân.',
    type: 'engineer',
    role: 'Kỹ sư Kỹ thuật Y sinh (Biomedical Engineer)',
    scenario: 'Một bệnh viện cần tạo một mảnh ghép xương gò má titan có cấu trúc vi mô rỗng phức tạp, hoàn toàn trùng khớp với cấu trúc giải phẫu riêng của từng bệnh nhân sau tai nạn. Bạn sẽ dùng công nghệ mới nào?',
    options: [
      {
        id: 'opt1',
        text: 'Công nghệ In 3D kim loại sinh học (đắp từng lớp bột titan theo mô hình quét CT)',
        isCorrect: true,
        engineerFeedback: 'Tuyệt vời! Công nghệ in 3D là phương pháp duy nhất có thể chế tạo các cấu trúc xương nhân tạo rỗng có độ tương thích sinh học theo từng milimet khớp với cơ thể người bệnh.'
      },
      {
        id: 'opt2',
        text: 'Đúc khuôn cát thủ công từ kim loại đồng thau',
        isCorrect: false,
        engineerFeedback: 'Tuyệt đối không được! Đồng thau có tính độc tế bào và đúc khuôn cát không đạt độ chính xác cho cấy ghép nội tạng người.'
      },
      {
        id: 'opt3',
        text: 'Dùng búa rèn tấm sắt nguội theo cảm tính của kỹ sư',
        isCorrect: false,
        engineerFeedback: 'Phản khoa học và gây nhiễm trùng nguy hiểm đến tính mạng người bệnh.'
      },
      {
        id: 'opt4',
        text: 'Sử dụng công nghệ hàn nung chảy các mẩu dây thép lại với nhau',
        isCorrect: false,
        engineerFeedback: 'Không thể ứng dụng trong y học vì gây viêm nhiễm và không tương thích giải phẫu.'
      }
    ],
    realWorldImpact: 'Đột phá ngành y học tái tạo, giúp cứu sống và hồi phục chức năng cho hàng vạn bệnh nhân.'
  },
  {
    id: 'eng-b4-s1-2',
    lessonId: 'bai-4',
    title: 'Tình huống 6: Ứng dụng dệt may kháng khuẩn bảo vệ y bác sĩ chống dịch',
    explanation: 'Bài 4 mục 1 SGK trang 24: Trong may mặc, công nghệ nano được ứng dụng trong một số loại vải đặc biệt bằng cách đưa các hạt nano bạc vào sợi vải, các hạt này có khả năng thu hút và tiêu diệt các vi khuẩn bám trên quần áo.',
    type: 'engineer',
    role: 'Kỹ sư Vật liệu Tiên tiến',
    scenario: 'Một xưởng may quân đội muốn sản xuất trang phục bảo hộ dã chiến có khả năng tự khử mùi hôi cơ thể và ngăn chặn vi khuẩn, vi rút bám dính mà giặt nhiều lần vẫn không mất tính năng. Bạn sẽ tích hợp vật liệu gì vào sợi vải?',
    options: [
      {
        id: 'opt1',
        text: 'Tích hợp các hạt Nano Bạc (Ag NPs) siêu nhỏ kích thước 1-100 nm vào sợi vải',
        isCorrect: true,
        engineerFeedback: 'Rất chuẩn mực SGK! Hạt nano bạc giải phóng ion bạc (Ag+) có khả năng phá vỡ màng tế bào vi khuẩn, mang lại khả năng diệt khuẩn bền vững qua nhiều lần giặt.'
      },
      {
        id: 'opt2',
        text: 'Ngâm vải vào nước muối đặc mỗi ngày trước khi mặc',
        isCorrect: false,
        engineerFeedback: 'Không hiệu quả! Nước muối sẽ khô kết tinh làm rách sợi vải và bị trôi sạch sau vài phút đổ mồ hôi.'
      },
      {
        id: 'opt3',
        text: 'Bọc một lớp tôn kim loại đen bên ngoài trang phục',
        isCorrect: false,
        engineerFeedback: 'Vô lý! Áo giáp tôn kim loại nặng nề, bí bách và cản trở hoàn toàn khả năng di chuyển tác chiến.'
      },
      {
        id: 'opt4',
        text: 'Sử dụng máy tính cá nhân cài phần mềm diệt vi rút máy tính để quét lên áo',
        isCorrect: false,
        engineerFeedback: 'Nhầm lẫn khôi hài giữa vi rút sinh học ngoài đời và vi rút máy tính số!'
      }
    ],
    realWorldImpact: 'Ứng dụng trong trang phục phi hành gia, y bác sĩ phòng dịch và đồ thể thao cao cấp.'
  },
  // BÀI 4 - BỘ 2
  {
    id: 'eng-b4-s2-1',
    lessonId: 'bai-4',
    title: 'Tình huống 7: Tự động hóa nông trại tưới tiêu dưa lưới thông minh từ xa',
    explanation: 'Bài 4 mục 6 SGK trang 28: Công nghệ Internet vạn vật (IoT) kết nối mọi thiết bị với internet, giúp máy móc trở nên thông minh hơn nhờ khả năng gửi và nhận thông tin tự động dựa trên cảm biến.',
    type: 'engineer',
    role: 'Kỹ sư Nông nghiệp Công nghệ cao',
    scenario: 'Một chủ nông trại muốn theo dõi độ ẩm đất, nhiệt độ nhà kính trồng dưa lưới từ điện thoại thông minh, và khi đất khô thì máy bơm tự động kích hoạt tưới nhỏ giọt đúng lượng nước quy định. Bạn sẽ thiết kế hệ thống dựa trên nền tảng công nghệ nào?',
    options: [
      {
        id: 'opt1',
        text: 'Hệ thống Internet vạn vật (IoT) gồm cảm biến đo ẩm độ đất, vi điều khiển Wi-Fi và van điện từ',
        isCorrect: true,
        engineerFeedback: 'Chính xác 100%! IoT kết nối cảm biến độ ẩm truyền dữ liệu lên đám mây, tự động kích hoạt bơm tưới và gửi thông báo trực quan về smartphone của chủ vườn mọi lúc mọi nơi.'
      },
      {
        id: 'opt2',
        text: 'Dùng một cỗ máy hơi nước James Watt đốt than liên tục để bơm nước tràn lan',
        isCorrect: false,
        engineerFeedback: 'Công nghệ quá lỗi thời! Vừa gây ô nhiễm môi trường vừa làm ngập úng thối rễ cây trồng.'
      },
      {
        id: 'opt3',
        text: 'Cắt gọt một chiếc cờ lê bằng máy phay CNC để công nhân cầm tay đi kiểm tra',
        isCorrect: false,
        engineerFeedback: 'Không liên quan đến tự động hóa và đo lường thông số môi trường.'
      },
      {
        id: 'opt4',
        text: 'Lắp một đèn huỳnh quang chiếu sáng liên tục suốt ngày đêm',
        isCorrect: false,
        engineerFeedback: 'Đèn huỳnh quang không đo được độ ẩm của đất và làm rối loạn chu kỳ sinh trưởng của cây.'
      }
    ],
    realWorldImpact: 'Tiết kiệm 50% nước tưới, tăng 30% năng suất nông sản sạch đạt chuẩn xuất khẩu.'
  },
  {
    id: 'eng-b4-s2-2',
    lessonId: 'bai-4',
    title: 'Tình huống 8: Phân loại kiện hàng bưu kiện tốc độ cao trong kho vận logistics',
    explanation: 'Bài 4 mục 5 & 7 SGK trang 27-28: Trí tuệ nhân tạo (AI) nhận dạng hình ảnh kết hợp Robot thông minh có khả năng nhận thức môi trường, tự ra quyết định di chuyển và phân loại bưu kiện an toàn, chính xác.',
    type: 'engineer',
    role: 'Kỹ sư Hệ thống Logistics & Chuỗi cung ứng',
    scenario: 'Trung tâm phân loại bưu điện tiếp nhận 500.000 kiện hàng mỗi ngày. Việc công nhân đọc mã vạch và bê vác tay thủ công dẫn đến quá tải và nhầm lẫn hàng. Bạn đề xuất phương án chuyển đổi nào?',
    options: [
      {
        id: 'opt1',
        text: 'Triển khai dàn Robot thông minh tự hành (AMR) tích hợp thị giác máy tính AI nhận diện mã vạch và phân loại tự động',
        isCorrect: true,
        engineerFeedback: 'Giải pháp hiện đại bậc nhất! Robot thông minh có bộ não AI đọc camera tốc độ mili-giây, tự tìm đường đi tối ưu trong kho mà không bao giờ mệt mỏi hay nhầm lẫn.'
      },
      {
        id: 'opt2',
        text: 'Yêu cầu người gửi tự đến kho tìm và lấy kiện hàng của mình',
        isCorrect: false,
        engineerFeedback: 'Phá vỡ quy trình dịch vụ bưu chính và gây hỗn loạn mất an ninh trật tự kho.'
      },
      {
        id: 'opt3',
        text: 'Dùng phương pháp đúc kim loại đúc thành từng khối kim loại bọc ngoài gói hàng',
        isCorrect: false,
        engineerFeedback: 'Hư hỏng toàn bộ hàng hóa bên trong và làm tăng trọng lượng phi lý.'
      },
      {
        id: 'opt4',
        text: 'Chuyển về dùng xe ngựa thồ hàng để tiết kiệm điện thoại',
        isCorrect: false,
        engineerFeedback: 'Thụt lùi lịch sử về thời tiền công nghiệp thế kỉ XVII!'
      }
    ],
    realWorldImpact: 'Nâng tốc độ xử lý đơn hàng lên gấp 10 lần, giao hàng hỏa tốc trong 24 giờ trên toàn quốc.'
  },
  // BÀI 6 - BỘ 1
  {
    id: 'eng-b6-s1-1',
    lessonId: 'bai-6',
    title: 'Tình huống 9: Tối ưu hoá năng suất xưởng lắp ráp ô tô theo bài học Lịch sử',
    explanation: 'Bài 6 mục 2 SGK trang 35: Năm 1908, Henry Ford đã áp dụng dây chuyền sản xuất hàng loạt chuyển động liên tục cho xe hơi, đưa sản xuất từ thủ công sang kỷ nguyên công nghiệp quy mô lớn của CMCN 2.0.',
    type: 'engineer',
    role: 'Kỹ sư Trưởng Dây chuyền Lắp ráp',
    scenario: 'Một xưởng cơ khí lắp ráp máy gặt lúa đang để mỗi thợ đứng một chỗ làm từ đầu đến cuối một chiếc máy, khiến sản lượng rất thấp và giá thành cao. Vận dụng bài học lịch sử từ cuộc Cách mạng Công nghiệp lần thứ hai, bạn sẽ cải tiến ra sao?',
    options: [
      {
        id: 'opt1',
        text: 'Áp dụng nguyên lí dây chuyền sản xuất hàng loạt chuyển động, chuyên môn hoá thao tác của từng công nhân (mô hình Henry Ford)',
        isCorrect: true,
        engineerFeedback: 'Bài học đắt giá của lịch sử công nghệ! Dây chuyền băng tải chuyển động giúp phân chia công việc chuyên biệt hóa, tăng vọt năng suất và giảm mạnh chi phí sản xuất.'
      },
      {
        id: 'opt2',
        text: 'Bắt công nhân quay lại làm rèn thủ công bằng búa như thế kỉ XVIII',
        isCorrect: false,
        engineerFeedback: 'Thụt lùi công nghệ, làm giảm năng suất nghiêm trọng.'
      },
      {
        id: 'opt3',
        text: 'Đóng cửa nhà máy và chờ phát minh mới xuất hiện',
        isCorrect: false,
        engineerFeedback: 'Quyết định thiếu tính xây dựng của một kỹ sư.'
      },
      {
        id: 'opt4',
        text: 'Thay động cơ điện bằng máy kéo hơi nước chạy củi đốt',
        isCorrect: false,
        engineerFeedback: 'Lạc hậu hơn 100 năm và gây khói bụi nguy hiểm trong nhà xưởng.'
      }
    ],
    realWorldImpact: 'Cơ sở của nền sản xuất công nghiệp hiện đại, đưa ô tô và thiết bị gia dụng đến từng gia đình.'
  },
  {
    id: 'eng-b6-s1-2',
    lessonId: 'bai-6',
    title: 'Tình huống 10: Vượt qua ranh giới khoảng cách trong CMCN 3.0',
    explanation: 'Bài 6 mục 3 SGK trang 36: Cuộc cách mạng công nghiệp lần thứ 3 (những năm 70 TK XX) với sự ra đời của máy tính và mạng Internet (1990) đã xoá nhoà ranh giới giữa các nhà máy, vùng miền, quốc gia và mang lại sự kết nối thông tin toàn cầu.',
    type: 'engineer',
    role: 'Kỹ sư Viễn thông & Mạng lưới',
    scenario: 'Tập đoàn bạn có văn phòng thiết kế ở Hà Nội, xưởng cơ khí ở Đà Nẵng và chi nhánh lắp ráp ở TP. Hồ Chí Minh. Làm thế nào để các kỹ sư có thể cùng đồng bộ bản vẽ kỹ thuật CAD theo thời gian thực mà không phải đi tàu xe gửi đĩa mềm?',
    options: [
      {
        id: 'opt1',
        text: 'Thiết lập mạng diện rộng Internet / Intranet đồng bộ dữ liệu kỹ thuật số qua máy chủ đám mây',
        isCorrect: true,
        engineerFeedback: 'Chính xác! Thành tựu mạng Internet của CMCN lần 3 cho phép truyền tải tức thời các tập tin kỹ thuật dung lượng lớn giữa các vùng địa lý cách xa nhau.'
      },
      {
        id: 'opt2',
        text: 'In bản vẽ ra giấy và thuê chim bồ câu đưa thư bay qua lại',
        isCorrect: false,
        engineerFeedback: 'Phương thức cổ xưa, bản vẽ kỹ thuật nặng nề bồ câu không thể mang vác và cực kỳ dễ thất lạc.'
      },
      {
        id: 'opt3',
        text: 'Chờ tàu hỏa hơi nước chở bản vẽ giấy giữa các thành phố',
        isCorrect: false,
        engineerFeedback: 'Mất nhiều ngày làm chậm trễ nghiêm trọng tiến độ dự án kỹ thuật.'
      },
      {
        id: 'opt4',
        text: 'Mỗi nơi tự vẽ theo ý mình không cần liên hệ với nhau',
        isCorrect: false,
        engineerFeedback: 'Khi lắp ráp các bộ phận sẽ không khớp nhau, gây thiệt hại hàng tỷ đồng.'
      }
    ],
    realWorldImpact: 'Tạo tiền đề cho xu hướng làm việc toàn cầu hóa (Global Collaboration) và chuỗi cung ứng quốc tế.'
  },
  // BÀI 6 - BỘ 2
  {
    id: 'eng-b6-s2-1',
    lessonId: 'bai-6',
    title: 'Tình huống 11: Xây dựng Nhà máy Thông minh (Smart Factory) trong kỷ nguyên 4.0',
    explanation: 'Bài 6 mục Thông tin bổ sung trang 38: Nhà máy thông minh trong CMCN 4.0 có khả năng vận hành tự động hoá hoàn toàn 24/7 nhờ kết nối IoT, dữ liệu lớn Big Data xử lý tự động đồng bộ từ khâu đầu vào đến khâu đầu ra.',
    type: 'engineer',
    role: 'Giám đốc Chuyển đổi số Nhà máy 4.0',
    scenario: 'Bạn được giao nhiệm vụ nâng cấp nhà máy sản xuất linh kiện điện tử thành một Nhà máy Thông minh (Smart Factory). Yếu tố cốt lõi nào bạn bắt buộc phải trang bị cho toàn bộ hệ thống?',
    options: [
      {
        id: 'opt1',
        text: 'Hệ thống cảm biến IoT liên kết Big Data, AI phân tích dữ liệu đồng bộ và robot vận hành liên tục 24/7',
        isCorrect: true,
        engineerFeedback: 'Đẳng cấp kỹ sư 4.0! Smart Factory đòi hỏi liên kết khép kín giữa máy móc vật lý với không gian dữ liệu số (Cyber-Physical Systems) để máy tự ra quyết định và tự thích ứng.'
      },
      {
        id: 'opt2',
        text: 'Chỉ cần sơn tường nhà máy màu xanh lam và dán khẩu hiệu 4.0',
        isCorrect: false,
        engineerFeedback: 'Chỉ là hình thức bên ngoài, không có bất kỳ hàm lượng công nghệ nào thay đổi.'
      },
      {
        id: 'opt3',
        text: 'Mua thêm thật nhiều máy dệt thủ công chạy bằng bàn đạp chân',
        isCorrect: false,
        engineerFeedback: 'Hoàn toàn đi ngược lại bản chất tự động hóa của kỷ nguyên số.'
      },
      {
        id: 'opt4',
        text: 'Ngắt toàn bộ mạng Internet để tránh rò rỉ dữ liệu',
        isCorrect: false,
        engineerFeedback: 'Mất kết nối sẽ làm tê liệt toàn bộ khả năng tương tác của nhà máy thông minh.'
      }
    ],
    realWorldImpact: 'Giúp doanh nghiệp tăng gấp đôi năng suất, giảm 40% chi phí vận hành và không bị đào thải trong kỷ nguyên số.'
  },
  {
    id: 'eng-b6-s2-2',
    lessonId: 'bai-6',
    title: 'Tình huống 12: Đột phá công nghệ giải phóng sức lao động trong CMCN 1.0',
    explanation: 'Bài 6 mục 1 SGK trang 34: Động cơ hơi nước của James Watt (1784) đã tạo ra bước bứt phá trong công nghiệp, thay thế sức người, sức kéo động vật và các nguồn năng lượng thiên nhiên bấp bênh (nước, gió) bằng nguồn động lực cơ học nhân tạo chủ động.',
    type: 'engineer',
    role: 'Kỹ sư Sử học Công nghệ',
    scenario: 'Vào cuối thế kỉ XVIII, một chủ mỏ than ở nước Anh gặp bế tắc vì nước ngầm tràn ngập hầm mỏ, trong khi sức ngựa kéo gầu nước không đủ nhanh để cứu mỏ. Phát minh nào đã giải quyết triệt để bài toán này và mở ra kỷ nguyên mới?',
    options: [
      {
        id: 'opt1',
        text: 'Động cơ hơi nước cải tiến của James Watt dẫn động máy bơm hút nước liên tục',
        isCorrect: true,
        engineerFeedback: 'Chính xác! Động cơ hơi nước của James Watt có thể hoạt động bền bỉ, công suất lớn, hút cạn nước ngầm trong hầm mỏ và sau đó được ứng dụng vào xe lửa, tàu thủy và nhà máy dệt.'
      },
      {
        id: 'opt2',
        text: 'Sử dụng hệ thống pin mặt trời và động cơ servo không chổi than',
        isCorrect: false,
        engineerFeedback: 'Sai thời đại! Vào thế kỉ XVIII loài người chưa phát minh ra pin mặt trời hay công nghệ điện.'
      },
      {
        id: 'opt3',
        text: 'Thả cá ăn bùn xuống đáy hầm than',
        isCorrect: false,
        engineerFeedback: 'Vô lý và không thể hạ được mực nước ngầm áp lực cao.'
      },
      {
        id: 'opt4',
        text: 'Dùng máy bay phản lực để thổi khô nước',
        isCorrect: false,
        engineerFeedback: 'Máy bay chỉ xuất hiện vào đầu thế kỉ XX (anh em Wright 1903).'
      }
    ],
    realWorldImpact: 'Mở ra cuộc Cách mạng Công nghiệp đầu tiên của nhân loại làm thay đổi vĩnh viễn văn minh thế giới.'
  },
  // TỔNG HỢP - BỘ 1 & BỘ 2
  {
    id: 'eng-th-s1-1',
    lessonId: 'tong-hop',
    title: 'Tình huống 13: Xây dựng giải pháp sản xuất xe máy điện thông minh Việt Nam',
    explanation: 'Tổng hợp Bài 3, 4, 6: Khung xe gia công dập/hàn (Bài 3); Động cơ điện và pin năng lượng sạch (Bài 3 & 4); Hệ thống định vị IoT và AI tự lái/chống trộm (Bài 4 & 6).',
    type: 'engineer',
    role: 'Tổng công trình sư Xe máy điện Thông minh',
    scenario: 'Đội ngũ của bạn đang chế tạo xe máy điện thế hệ mới cho học sinh sinh viên. Dự án đòi hỏi: khung sườn thép chắc chắn, động cơ điện êm ái tiết kiệm điện, và xe có tính năng kết nối điện thoại cảnh báo chống trộm thông minh. Bạn sẽ phối hợp các công nghệ nào?',
    options: [
      {
        id: 'opt1',
        text: 'Kết hợp: Gia công cán ép sườn xe (Bài 3) + Động cơ điện - cơ hiệu suất cao (Bài 3) + Kết nối IoT định vị và AI quản lý pin (Bài 4 & 6)',
        isCorrect: true,
        engineerFeedback: 'Tư duy kỹ thuật liên ngành xuất sắc! Một sản phẩm công nghệ hiện đại luôn là sự phối hợp hài hòa giữa cơ khí luyện kim nền tảng, công nghệ chuyển đổi năng lượng và công nghệ số thông minh.'
      },
      {
        id: 'opt2',
        text: 'Chỉ lắp một động cơ hơi nước đốt than cồng kềnh phía sau yên xe',
        isCorrect: false,
        engineerFeedback: 'Bốc khói đen kịt, cồng kềnh, dễ gây bỏng cho người điều khiển và vi phạm luật giao thông.'
      },
      {
        id: 'opt3',
        text: 'Đúc toàn bộ chiếc xe bằng một khối xi măng đặc',
        isCorrect: false,
        engineerFeedback: 'Xe quá nặng, không thể di chuyển và không chứa được các mạch điện tử.'
      },
      {
        id: 'opt4',
        text: 'Bỏ qua khung xe và động cơ, chỉ cài một ứng dụng trên điện thoại',
        isCorrect: false,
        engineerFeedback: 'Một ứng dụng phần mềm không thể chở người đi trên đường nếu thiếu phần cứng cơ khí!'
      }
    ],
    realWorldImpact: 'Thúc đẩy giao thông xanh, giảm khí thải carbon bảo vệ bầu không khí các đô thị lớn.'
  },
  {
    id: 'eng-th-s2-1',
    lessonId: 'tong-hop',
    title: 'Tình huống 14: Ứng cứu sự cố sạt lở đường ống năng lượng vùng cao',
    explanation: 'Tổng hợp SGK: Khảo sát địa hình bằng flycam/robot AI (Bài 4); Nhanh chóng in 3D hoặc gia công CNC cút nối thay thế (Bài 4); Hàn áp lực hoặc nối ống chắc chắn (Bài 3); Truyền dữ liệu qua mạng không dây 4G/5G (Bài 3).',
    type: 'engineer',
    role: 'Kỹ sư Ứng cứu Khẩn cấp Nhà máy Thủy điện',
    scenario: 'Mưa lũ gây sạt lở làm nứt vỡ một đoạn cút nối kim loại uốn cong đặc thù của đường ống áp lực dẫn nước vào tuabin thủy điện trên núi cao hiểm trở, xe tải không vào được. Bạn sẽ xử lý thế nào để khôi phục nhanh nhất?',
    options: [
      {
        id: 'opt1',
        text: 'Dùng thiết bị quét 3D đo đạc gửi dữ liệu qua mạng vô tuyến -> Gia công chi tiết thay thế bằng máy CNC / In 3D kim loại -> Dùng drone cẩu đến và hàn hồ quang cố định',
        isCorrect: true,
        engineerFeedback: 'Giải pháp của một kỹ sư tương lai tài năng! Tận dụng sức mạnh số hóa 4.0, truyền thông vô tuyến kết hợp gia công hiện đại và kỹ thuật hàn cơ khí giúp giải quyết bài toán hóc búa trong thời gian ngắn nhất.'
      },
      {
        id: 'opt2',
        text: 'Dùng băng dính dán quanh đường ống nước áp lực cao',
        isCorrect: false,
        engineerFeedback: 'Băng dính sẽ vỡ toang ngay lập tức trước áp lực cột nước hàng trăm tấn!'
      },
      {
        id: 'opt3',
        text: 'Ngồi chờ mùa khô năm sau khi đường bộ khô ráo mới tính tiếp',
        isCorrect: false,
        engineerFeedback: 'Làm mất điện cả một vùng dân cư rộng lớn trong nhiều tháng trời.'
      },
      {
        id: 'opt4',
        text: 'Đập phá toàn bộ con đập thủy điện xây lại từ đầu',
        isCorrect: false,
        engineerFeedback: 'Phá hoại công trình trọng điểm quốc gia và gây thảm họa lũ lụt nhân tạo!'
      }
    ],
    realWorldImpact: 'Ứng dụng thực tế trong bảo trì công trình hạ tầng quốc gia và cứu hộ thiên tai hiểm trở.'
  }
];
