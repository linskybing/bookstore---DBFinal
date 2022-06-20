-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-06-20 16:59:50
-- 伺服器版本： 10.4.21-MariaDB
-- PHP 版本： 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `secondhandmarket`
--
CREATE DATABASE IF NOT EXISTS `secondhandmarket` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `secondhandmarket`;

-- --------------------------------------------------------

--
-- 資料表結構 `announcement`
--

DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `AnnouncementId` int(10) UNSIGNED NOT NULL COMMENT '公告編號',
  `Title` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '公告標題',
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '公告標題',
  `Admin` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '管理員帳號',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `announcement`
--

INSERT INTO `announcement` (`AnnouncementId`, `Title`, `Content`, `Admin`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '退款說明', '如果我收到買家的退貨要求，我該怎麼處理？&#13;&#10;STEP 1. 當您收到退貨退款申請時，建議您先與買家聯繫了解退貨退款原因，許多退貨退款申請都可以先透過溝通順利解決&#13;&#10;&#13;&#10;STEP 2. 當買家提出退貨退款申請，您需於三日內主動回應是否同意買家的退貨／退款申請。如果您不同意買家的退貨／退款申請，您可以向蝦皮提出爭議。&#13;&#10;&#13;&#10;STEP 3. 在您同意買家的退貨退款申請後，買家會根據需求選擇欲使用的退貨物流。&#13;&#10;&#1', 'Account', '2022-06-16 00:28:06', '2022-06-16 00:28:06', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `CategoryId` int(10) UNSIGNED NOT NULL COMMENT '種類編號',
  `Tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '種類名稱',
  `Color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`CategoryId`, `Tag`, `Color`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '文學小說', '#264653', '2022-05-23 17:39:30', '2022-05-23 17:39:30', '0000-00-00 00:00:00'),
(2, '商業理財', '#2A9D8F', '2022-05-23 17:39:44', '2022-05-23 17:39:44', '2022-06-06 23:05:26'),
(3, '藝術設計', '#E9C46A', '2022-05-23 17:39:52', '2022-05-23 17:39:52', '0000-00-00 00:00:00'),
(4, '人文史地', '#F4A261', '2022-05-23 17:40:01', '2022-05-23 17:40:01', '0000-00-00 00:00:00'),
(5, '社會科學', '#E76F51', '2022-05-23 17:40:08', '2022-05-23 17:40:08', '0000-00-00 00:00:00'),
(6, '自然科普', '#3A86FF', '2022-05-23 17:40:34', '2022-05-23 17:40:34', '0000-00-00 00:00:00'),
(7, '心理勵志', '#FFBE0B', '2022-05-23 17:40:52', '2022-05-23 17:40:52', '0000-00-00 00:00:00'),
(8, '醫療保健', '#FB5607', '2022-05-23 17:40:58', '2022-05-23 17:40:58', '0000-00-00 00:00:00'),
(9, '飲食', '#FF006E', '2022-05-23 17:41:02', '2022-05-23 17:41:02', '0000-00-00 00:00:00'),
(10, '生活風格', '#8338EC', '2022-05-23 17:41:08', '2022-05-23 17:41:08', '0000-00-00 00:00:00'),
(11, '旅遊', '#606C38', '2022-05-23 17:41:12', '2022-05-23 17:41:12', '0000-00-00 00:00:00'),
(12, '宗教命理', '#283618', '2022-05-23 17:41:19', '2022-05-23 17:41:19', '0000-00-00 00:00:00'),
(13, '親子教養', '#DDA15E', '2022-05-23 17:41:24', '2022-05-23 17:41:24', '0000-00-00 00:00:00'),
(14, '童書/青少年文學', '#BC6C25', '2022-05-23 17:41:35', '2022-05-23 17:41:35', '0000-00-00 00:00:00'),
(15, '影視偶像', '#003049', '2022-05-23 17:42:15', '2022-05-23 17:42:15', '0000-00-00 00:00:00'),
(16, '輕小說', '#D62828', '2022-05-23 17:42:21', '2022-05-23 17:42:21', '0000-00-00 00:00:00'),
(18, '語言學習', '#FCBF49', '2022-05-23 17:42:36', '2022-05-23 17:42:36', '0000-00-00 00:00:00'),
(19, '考試用書', '#EAE2B7', '2022-05-23 17:42:41', '2022-05-23 17:42:41', '0000-00-00 00:00:00'),
(20, '電腦資訊', '#03071E', '2022-05-23 17:42:47', '2022-05-23 17:42:47', '0000-00-00 00:00:00'),
(21, '專業/教科書/政府出版品', '#2EC4B6', '2022-05-23 17:43:00', '2022-06-06 22:25:08', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
CREATE TABLE `chatroom` (
  `RoomId` int(10) UNSIGNED NOT NULL COMMENT '聊天室編號',
  `Seller` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '賣家',
  `User` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `chatroom`
--

INSERT INTO `chatroom` (`RoomId`, `Seller`, `User`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Account', 'test5', '2022-06-15 23:47:09', '2022-06-15 23:47:09', '0000-00-00 00:00:00'),
(2, 'Account', 'Account', '2022-06-16 08:26:33', '2022-06-16 08:26:33', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `dealmessage`
--

DROP TABLE IF EXISTS `dealmessage`;
CREATE TABLE `dealmessage` (
  `MessageId` int(10) UNSIGNED NOT NULL COMMENT '訊息編號',
  `RecordId` int(10) UNSIGNED NOT NULL COMMENT '紀錄編號',
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言內容',
  `Creator` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言者',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `dealreview`
--

DROP TABLE IF EXISTS `dealreview`;
CREATE TABLE `dealreview` (
  `ReviewId` int(10) UNSIGNED NOT NULL COMMENT '評價編號',
  `RecordId` int(10) UNSIGNED NOT NULL COMMENT '交易編號',
  `CustomerScore` int(11) DEFAULT NULL COMMENT '顧客評價分數',
  `CustomerReview` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '顧客評價內容',
  `CustomerTime` datetime DEFAULT NULL COMMENT '顧客評價時間',
  `SellerScore` int(11) DEFAULT NULL COMMENT '賣家評價分數',
  `SellerReview` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '賣家評價內容',
  `SellerTime` datetime NOT NULL COMMENT '賣家評價時間',
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `dealreview`
--

INSERT INTO `dealreview` (`ReviewId`, `RecordId`, `CustomerScore`, `CustomerReview`, `CustomerTime`, `SellerScore`, `SellerReview`, `SellerTime`, `DeletedAt`) VALUES
(1, 1, 5, '書籍品質、賣家服務態度良好', '2022-06-15 22:45:41', 5, '買家讚', '2022-06-15 22:45:56', '0000-00-00 00:00:00'),
(2, 3, 5, '讚', '2022-06-15 23:53:18', 5, '買家很讚', '2022-06-15 23:53:18', '0000-00-00 00:00:00'),
(3, 4, 5, '讚', '2022-06-16 00:08:07', 5, '讚', '2022-06-16 00:08:17', '0000-00-00 00:00:00'),
(4, 6, 5, '讚', '2022-06-16 00:43:23', 5, '讚', '2022-06-16 00:43:23', '0000-00-00 00:00:00'),
(5, 7, 5, '讚', '2022-06-16 00:52:01', 5, '讚', '2022-06-16 00:52:09', '0000-00-00 00:00:00'),
(6, 8, 5, '讚', '2022-06-16 08:07:43', 5, '讚', '2022-06-16 08:07:43', '0000-00-00 00:00:00'),
(7, 2, 5, '讚', '2022-06-16 08:08:51', 5, '讚', '2022-06-16 08:08:51', '0000-00-00 00:00:00'),
(8, 9, 3, '還行', '2022-06-16 08:11:56', 5, '讚', '2022-06-16 08:11:56', '0000-00-00 00:00:00'),
(9, 10, 3, '還行', '2022-06-16 08:16:44', 5, '讚', '2022-06-16 08:16:44', '0000-00-00 00:00:00'),
(10, 11, 5, '讚', '2022-06-16 08:20:42', 5, '讚', '2022-06-16 08:20:55', '0000-00-00 00:00:00'),
(11, 12, 4, 'good', '2022-06-16 10:28:29', 5, '讚', '2022-06-16 10:28:29', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `deposits`
--

DROP TABLE IF EXISTS `deposits`;
CREATE TABLE `deposits` (
  `DepositId` int(10) UNSIGNED NOT NULL COMMENT '存款編號',
  `User` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者',
  `BankId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '銀行編號',
  `DepositAccount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '存款帳戶',
  `State` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '未驗證' COMMENT '存款帳戶狀態',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `deposits`
--

INSERT INTO `deposits` (`DepositId`, `User`, `BankId`, `DepositAccount`, `State`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Account', '508', '74687678678876', '未驗證', '2022-05-10 17:19:40', '2022-05-10 17:21:36', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `functionlist`
--

DROP TABLE IF EXISTS `functionlist`;
CREATE TABLE `functionlist` (
  `FunctionId` int(10) UNSIGNED NOT NULL COMMENT '功能編號',
  `FunctionName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '功能名稱',
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `functionlist`
--

INSERT INTO `functionlist` (`FunctionId`, `FunctionName`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '公告管理', '2022-05-23 17:33:17', '2022-05-23 17:33:17', '0000-00-00 00:00:00'),
(2, '商品種類管理', '2022-05-23 17:33:34', '2022-05-23 17:33:34', '0000-00-00 00:00:00'),
(3, '權限管理', '2022-05-23 17:33:51', '2022-05-23 17:33:51', '0000-00-00 00:00:00'),
(4, '問題回報', '2022-05-23 17:34:31', '2022-05-23 17:34:31', '0000-00-00 00:00:00'),
(5, '報表分析', '2022-06-06 16:02:46', '2022-06-06 16:02:46', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `problemlist`
--

DROP TABLE IF EXISTS `problemlist`;
CREATE TABLE `problemlist` (
  `ProblemId` int(10) UNSIGNED NOT NULL COMMENT '問題編號',
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '問題標題',
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '問題內容',
  `PostUser` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '上傳者',
  `State` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '未解決' COMMENT '問題狀態',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `problemlist`
--

INSERT INTO `problemlist` (`ProblemId`, `Title`, `Content`, `PostUser`, `State`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '保證金', '請問租借的保證金是否會延續至其他商品呢?&#13;&#10;', 'test5', '未解決', '2022-06-16 07:39:51', '2022-06-16 07:39:51', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `problemreply`
--

DROP TABLE IF EXISTS `problemreply`;
CREATE TABLE `problemreply` (
  `ProblemReply` int(10) UNSIGNED NOT NULL COMMENT '回覆編號',
  `ProblemId` int(10) UNSIGNED NOT NULL COMMENT '問題編號',
  `Reply` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '回覆內容',
  `ReplyUser` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '回覆者',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `problemreply`
--

INSERT INTO `problemreply` (`ProblemReply`, `ProblemId`, `Reply`, `ReplyUser`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 1, '會的', 'Account', '2022-06-16 07:40:10', '2022-06-16 07:40:10', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `ProductId` int(10) UNSIGNED NOT NULL COMMENT '商品編號',
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品名稱',
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品描述',
  `Price` int(11) NOT NULL COMMENT '價格',
  `Inventory` int(11) NOT NULL COMMENT '庫存',
  `State` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'on' COMMENT '商品狀態',
  `Seller` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '賣家',
  `Watch` int(11) NOT NULL DEFAULT 0,
  `Rent` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否為租借商品',
  `MaxRent` int(11) NOT NULL DEFAULT 0 COMMENT '最大粗借天數',
  `RentPrice` int(11) NOT NULL DEFAULT 0 COMMENT '每天租借價格',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`ProductId`, `Name`, `Description`, `Price`, `Inventory`, `State`, `Seller`, `Watch`, `Rent`, `MaxRent`, `RentPrice`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '刺客正傳系列套書【二十五週年紀念．限量典藏插畫精裝書盒版】', '作者羅蘋．荷布：「二十五年來，蜚滋從一個五歲的小屁孩，成長為一個刺客高手，再到歷經滄桑的六十歲男人。朋友、伙伴來來去去，他經歷過困苦和孤寂，享受過安詳和滿足。一本接著一本書，我和讀者一直陪伴著他……衷心感激你，在心靈騰出一個空間，給了我的人物角色一個家。」', 1999, 50, 'on', 'Account', 0, 0, 0, 0, '2022-06-14 22:59:46', '2022-06-14 22:59:46', '0000-00-00 00:00:00'),
(2, '艾笛的永生契約', '亞馬遜網路書店年度20大推薦書、美國獨立書商協會選書、邦諾書店選書&#13;&#10;每月一書俱樂部年度好書決選入圍&#13;&#10;《出版人週刊》、《柯克斯書評》、《書單》、《圖書館期刊》星號佳評&#13;&#10;歐普拉雜誌、芝加哥論壇報、娛樂週刊、美國國家廣播電台、CNN、Medium、Bustle、PopSugar、BuzzFeed、io9、Literary Hub、Book Riot推薦選書', 411, 50, 'on', 'Account', 0, 0, 0, 0, '2022-06-14 23:02:35', '2022-06-16 00:31:21', '0000-00-00 00:00:00'),
(3, '貝加爾湖隱居札記', '　　兩隻狗、一座燒柴鍋爐，以及一扇面湖的窗戶，這是戴松僅有的東西。他靠自己的雙手將小木屋內部打造成像梵谷在亞爾小鎮那間黃房子，自然明亮且毫不矯飾。他每天的生活逐漸簡化成幾個行為：砍柴、釣魚、煮飯；而陪伴他的只有書籍、伏特加與雪茄。', 284, 50, 'on', 'Account', 0, 0, 0, 0, '2022-06-14 23:03:50', '2022-06-16 00:33:22', '0000-00-00 00:00:00'),
(4, '在自己房間裡的旅行', '　　雖然困居一室之內，但只要能把這段日子看作是個旅程，那不僅可以讓自己脫離空間的桎梏，奔放於這個旅程，還可以強化自己的感覺能力，讓以前麻木的變敏銳，以前的自大翻轉成謙卑。&#13;&#10;&#13;&#10;　　因決鬥被判禁足四十二天，又適逢熱鬧的嘉年華會如火如荼展開，對一位血氣方剛的二十七歲軍官來說，無疑是最大的懲罰。軍令、屋牆固然可禁錮身體的移動，卻無法禁止一顆活躍心靈上天入地、穿梭古今；何況還有善良忠僕和愛犬，加上書冊畫作陪伴。想像力獲得最大釋放，帶領青年自由翱翔，讓原本鬱悶不堪的禁足，脫胎成一趟', 198, 50, 'on', 'Account', 0, 0, 0, 0, '2022-06-14 23:04:41', '2022-06-15 22:43:40', '0000-00-00 00:00:00'),
(5, '銀之夜', '　　千鶴的婚姻是攤靜止的死水。丈夫外遇，夜不歸戶，但她不嫉妒也不戳破，因為她「需要」婚姻帶來的安穩。可是明明已經這麼孤單了，還是會害怕物理上孤身一人，千鶴對這樣的自己感到困惑。', 300, 48, 'on', 'Account', 0, 0, 0, 0, '2022-06-15 09:53:14', '2022-06-16 00:34:21', '0000-00-00 00:00:00'),
(6, '彼岸花盛開之島【日本原版書封】', '　　李琴峰醞釀多年，揉合歷史與文化思索、西洋「烏托邦」與東方「桃花源」意象，突破而大膽的語言實驗、宗教與傳說、性別與酷兒，編織出一則溫柔又充滿詩意的奇幻寓言。', 273, 50, 'on', 'Account', 0, 1, 56, 10, '2022-06-15 09:54:50', '2022-06-15 09:54:50', '0000-00-00 00:00:00'),
(7, '好好再見 不負遇見', '　　曾經孤獨的少年，遇上了另一個孤獨的靈魂，兩個孤單的人看似完整了彼此的寂寞。然而，孤獨從未因此消失，只是被藏進心中，埋藏在人際往來的喧囂背後。', 300, 2, 'on', 'Account', 0, 1, 50, 5, '2022-06-15 09:55:46', '2022-06-15 23:51:10', '0000-00-00 00:00:00'),
(8, '建築物室內裝修工程管理乙級學術科技能檢定考照祕笈', '　　根據勞動部技能檢定中心的統計資料(100~109年)，報考「建築物室內裝修工程管理」職類人數累計達50706人，平均每年約有五千多人的報考。且合格通過率也由5%及11%，逐年增加至39%左右(近40%)。在術科考題也由過去的A、B、C、D四卷且範圍較亂，在民國108年起改為A、B、C三卷且範圍較明確。', 498, 160, 'on', 'Account', 0, 1, 180, 3, '2022-06-15 09:58:31', '2022-06-16 08:13:29', '0000-00-00 00:00:00'),
(9, '2022金融基測／銀行招考題庫套書', '　　2021年起，因金融基測不再公布試題，且各大公股行庫招考之試題也不再對非考生公開。使得對未來有意參加銀行考試、投身金融業的準考生而言，少了重要考古資料下，容易陷入備考上無所適從、抓不到重點的困境。', 672, 50, 'on', 'Account', 0, 1, 30, 5, '2022-06-15 10:04:55', '2022-06-15 10:04:55', '0000-00-00 00:00:00'),
(10, '2022細說金融基測／銀行招考套書', '　　最新題庫完全攻略：本版特與民間各銀行招考讀書會合作，透過廣大考生們考後的無私分享，除陸續將各大公股行庫招考試題收錄外，也逐漸歸納整理出金融基測FIT的命題輪廓。第一部分收錄各大公股行庫招考與其他相關考試試題、第二部分則針對金融基測命題方向，設計仿真模擬試題。試題數量充足、題題均附詳盡解析。一書在手，最新試題情報全部掌握。', 1699, 50, 'on', 'Account', 0, 1, 60, 6, '2022-06-15 10:06:37', '2022-06-15 10:09:27', '0000-00-00 00:00:00'),
(11, '貓哲學：貓與生命意義', '　　人這種動物，只要活著就經常感到不安與憂懼，無論是人跟世界的關係，或是人跟自己的關係，總是充滿痛苦折磨。人類的哲學思想，有大半在討論人為何會痛苦，該怎麼避免痛苦，如何在充滿變動與失落的世界安身，如何過得幸福快樂。&#13;&#10; &#13;&#10;　　貓卻不同。貓不追求幸福，因為幸福就是牠們的預設狀態。這本書的主題是貓的天性，以及我們可以從中學到什麼。我們能夠從貓身上學到的，或許比過往的偉大思想家更多。', 252, 19, 'on', 'Account', 0, 1, 30, 2, '2022-06-15 10:41:33', '2022-06-16 10:27:01', '0000-00-00 00:00:00'),
(12, '一次戰勝新制多益TOEIC必考核心單字', '　　本書按照多益官方頒訂的13大情境所規劃，依照這些情境延伸出20個單元，所有單字及例句完全符合多益考試必考情境，讓你用最寶貴的時間學到最必要的單字！', 336, 72, 'on', 'Account', 0, 1, 180, 3, '2022-06-15 10:52:39', '2022-06-15 22:46:43', '0000-00-00 00:00:00'),
(13, '前進滿分GEPT全民英檢初級試題解析+單字大全', '　　為幫助讀者用更便利的方式收聽書中音檔，特別取得「Youtor有它外語」授權使用「VRP虛擬點讀筆」專利設計。只要下載專屬App，即可隨時利用手機掃描書中的QR Code，馬上聽取本書的字彙英文發音、中文解釋。不用花錢購買「點讀筆」，也能享有和「點讀筆」一樣的功能。', 299, 49, 'on', 'Account', 0, 0, 0, 0, '2022-06-15 10:58:42', '2022-06-16 00:07:07', '0000-00-00 00:00:00'),
(14, 'IELTS 雅思致勝寶典：圖解聽說讀寫攻略+ 4回完勝 模擬試題', '　　Global ELT是英國專門出版針對國際認證ELT（English Language Teaching）測驗的模擬試題及準備用書的權威出版社，產品種類包括：雅思、托福、多益、劍橋國際英語認證……等。除了考試書籍，Global ELT也出版許多英語學習書籍，如文法、聽說讀寫、字彙、ELT字典、慣用語與動詞片語、英語學習主教材及各類分級讀本等。', 567, 50, 'on', 'Account', 0, 1, 180, 7, '2022-06-15 11:04:17', '2022-06-15 11:04:17', '0000-00-00 00:00:00'),
(15, '史上最強NEW GEPT全民英檢中級單字+文法(附文法教學影片', '　　《史上最強全民英檢中級單字＋文法》，一次給你&#13;&#10;　　最強的必考單字！&#13;&#10;　　以官方字表為基礎，收錄近2700個必考單字。&#13;&#10; &#13;&#10;　　最強的學習內容！&#13;&#10;　　單字中英文、近反義字、片語、衍生字等全收錄。&#13;&#10; &#13;&#10;　　最強的文法解說！&#13;&#10;　　重點文法解說，搭配真人講解文法影片，&#13;&#10;　　學單字還可以學文法！&#13;&#10; &#13;&#10;　　要背就要背會', 276, 46, 'on', 'Account', 0, 0, 0, 0, '2022-06-15 11:06:06', '2022-06-16 00:49:16', '0000-00-00 00:00:00'),
(16, '大數據驅動商業決策：13 個 RapidMiner 商業預測操作實務', '　　手搖飲競爭對手在哪裡？超市商品之間是否有關連性？推薦什麼電影給客戶？客戶是否下單買保險？電信業的客戶是否跳槽？公司未來營收可能是多少…公司從草創到轉型的過程中，會遇到很多的問題。但是，現在你有了解決方案！', 498, 50, 'on', 'Account', 0, 0, 0, 0, '2022-06-15 11:07:10', '2022-06-15 11:07:10', '0000-00-00 00:00:00'),
(17, '我在地球的奇異旅程', '　　他的外公是政治受難者，被控意圖顛覆政府，被關12年。\n　　他的父親，國小沒畢業，是曾經想當乩童的水泥工，在他國二離世。\n　　他的母親，只有小學畢業，含辛茹苦撫養三個孩子，卻做著他無法認同的事。\n　　他八個月大罹患小兒麻痺，七歲之前不會走路，後來取得碩士學位，任職花旗、滾石等知名企業，成為作家以及兩岸三地企業講師，到北極圈拜訪過聖誕老人，並登上TED講台……', 300, 20, 'on', 'Account', 0, 1, 180, 3, '2022-06-16 08:09:42', '2022-06-16 09:04:29', '0000-00-00 00:00:00'),
(18, '領導大師麥斯威爾【全球暢銷經典套書】', '　　成功者知道如何解決問題、創造機會，因為他們的腦袋就是不一樣，而且時時刻刻在思考。但是「思考」很抽象，普通人該如何換上成功者的腦袋？麥斯威爾研究企業、學術、運動、政壇……各領域成功者將近半世紀，他發現：成功者的思考有方法，而且人人都可以學習！世界領導學大師麥斯威爾教你學會11種成功者的思考法，與成功連結。', 735, 19, 'on', 'Account', 0, 0, 0, 0, '2022-06-16 08:19:07', '2022-06-16 08:19:53', '0000-00-00 00:00:00'),
(19, 'asdf', 'asdf', 165, 56, 'on', 'Account', 0, 0, 0, 0, '2022-06-16 10:07:05', '2022-06-16 10:07:05', '2022-06-16 10:07:18'),
(20, 'DEMO', 'SDfasdfs', 13546, 46546, 'on', 'Account', 0, 0, 0, 0, '2022-06-16 10:24:58', '2022-06-16 10:24:58', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `productimage`
--

DROP TABLE IF EXISTS `productimage`;
CREATE TABLE `productimage` (
  `ImageId` int(10) UNSIGNED NOT NULL COMMENT '商品圖片編號',
  `ProductId` int(10) UNSIGNED NOT NULL COMMENT '商品編號',
  `Image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品圖片',
  `CreatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `productimage`
--

INSERT INTO `productimage` (`ImageId`, `ProductId`, `Image`, `CreatedAt`) VALUES
(1, 1, 'MQ.webp', '2022-06-14 23:01:41'),
(2, 2, 'Mg.webp', '2022-06-14 23:03:05'),
(3, 3, 'Mw.webp', '2022-06-14 23:04:06'),
(4, 4, 'NA.webp', '2022-06-14 23:04:52'),
(5, 5, 'NQ.webp', '2022-06-15 09:53:39'),
(6, 6, 'Ng.webp', '2022-06-15 09:55:02'),
(7, 7, 'Nw.webp', '2022-06-15 09:56:16'),
(8, 8, 'OA.webp', '2022-06-15 10:03:15'),
(9, 9, 'OQ.webp', '2022-06-15 10:05:13'),
(10, 10, 'MTA.webp', '2022-06-15 10:06:53'),
(11, 11, 'MTE.webp', '2022-06-15 10:41:47'),
(12, 12, 'MTI.webp', '2022-06-15 10:53:09'),
(13, 13, 'MTM.webp', '2022-06-15 10:59:07'),
(14, 14, 'MTQ.webp', '2022-06-15 11:04:34'),
(15, 15, 'MTU.webp', '2022-06-15 11:06:26'),
(16, 16, 'MTY.webp', '2022-06-15 11:07:38'),
(17, 17, 'MTc.webp', '2022-06-16 08:10:03'),
(18, 18, 'MTg.webp', '2022-06-16 08:19:25'),
(19, 20, 'MTk.webp', '2022-06-16 10:25:06');

-- --------------------------------------------------------

--
-- 資料表結構 `productquestion`
--

DROP TABLE IF EXISTS `productquestion`;
CREATE TABLE `productquestion` (
  `QuestionId` int(10) UNSIGNED NOT NULL COMMENT '問題編號',
  `ProductId` int(10) UNSIGNED NOT NULL COMMENT '商品編號',
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '問題內容',
  `PostTime` datetime NOT NULL COMMENT '上傳時間',
  `Customer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '買家',
  `Reply` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '回應內容',
  `ReplyTime` datetime DEFAULT NULL COMMENT '回應時間',
  `Seller` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '賣家',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `recordchat`
--

DROP TABLE IF EXISTS `recordchat`;
CREATE TABLE `recordchat` (
  `ChatId` int(10) UNSIGNED NOT NULL COMMENT '聊天訊息編號',
  `RoomId` int(10) UNSIGNED NOT NULL COMMENT '聊天室編號',
  `Creator` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言者',
  `Message` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '對話內容',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `recordchat`
--

INSERT INTO `recordchat` (`ChatId`, `RoomId`, `Creator`, `Message`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 1, 'test5', '好好再見 不負遇見，書齡是多少呢', '2022-06-15 23:47:56', '2022-06-15 23:47:56', '0000-00-00 00:00:00'),
(2, 1, 'test5', '?', '2022-06-15 23:48:41', '2022-06-15 23:48:41', '0000-00-00 00:00:00'),
(3, 1, 'Account', '大約只有1年基本全新', '2022-06-15 23:50:34', '2022-06-15 23:50:34', '0000-00-00 00:00:00'),
(4, 1, 'test5', '好的謝謝', '2022-06-15 23:50:47', '2022-06-15 23:50:47', '0000-00-00 00:00:00'),
(5, 1, 'test5', 'hi', '2022-06-16 08:56:49', '2022-06-16 08:56:49', '0000-00-00 00:00:00'),
(6, 1, 'test5', '商品還有嗎', '2022-06-16 10:26:31', '2022-06-16 10:26:31', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `recorddeal`
--

DROP TABLE IF EXISTS `recorddeal`;
CREATE TABLE `recorddeal` (
  `RecordId` int(10) UNSIGNED NOT NULL COMMENT '交易編號',
  `ShoppingId` int(10) UNSIGNED NOT NULL COMMENT '商品清單編號',
  `State` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '交易狀態',
  `DealMethod` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '交易方式',
  `SentAddress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '寄送地址',
  `Phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '買家電話',
  `DealType` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '交易類型',
  `StartTime` datetime DEFAULT NULL COMMENT '起始時間',
  `EndTime` datetime DEFAULT NULL COMMENT '歸還時間',
  `Seller_Agree` tinyint(4) DEFAULT NULL COMMENT '賣家同意取消',
  `SellerContent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '賣家取消說明',
  `Customer_Agree` tinyint(4) DEFAULT NULL COMMENT '使用者同意取消',
  `CustomerContent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '使用者取消內容',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL,
  `ReturnTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `recorddeal`
--

INSERT INTO `recorddeal` (`RecordId`, `ShoppingId`, `State`, `DealMethod`, `SentAddress`, `Phone`, `DealType`, `StartTime`, `EndTime`, `Seller_Agree`, `SellerContent`, `Customer_Agree`, `CustomerContent`, `CreatedAt`, `UpdatedAt`, `DeletedAt`, `ReturnTime`) VALUES
(1, 2, '完成交易', '貨到付款', '404台中市北區三民路三段129號', '0906307318', 'Rent', '2022-06-15 22:44:56', '2022-06-16 22:44:56', NULL, NULL, NULL, NULL, '2022-06-15 22:44:29', '2022-06-15 22:45:56', '0000-00-00 00:00:00', '2022-06-15 22:45:07'),
(2, 3, '完成交易', '貨到付款', '404台中市北區三民路三段129號', '0906307318', 'Rent', '2022-06-15 23:52:15', '2022-10-15 23:52:15', NULL, NULL, NULL, NULL, '2022-06-15 22:47:00', '2022-06-16 08:08:51', '0000-00-00 00:00:00', '2022-06-16 08:08:17'),
(3, 4, '完成交易', '貨到付款', '台中科技大學', '0906307318', 'Rent', '2022-06-15 23:52:04', '2022-08-02 23:52:04', NULL, NULL, NULL, NULL, '2022-06-15 23:51:24', '2022-06-15 23:53:18', '0000-00-00 00:00:00', '2022-06-15 23:52:07'),
(4, 5, '完成交易', '面交', '台中科大', '0906307318', 'Buy', NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-16 00:07:34', '2022-06-16 00:08:18', '0000-00-00 00:00:00', NULL),
(5, 6, '已取消', '貨到付款', '台中科技大學', '0906307318', 'Buy', NULL, NULL, 1, NULL, 1, '買錯', '2022-06-16 00:29:40', '2022-06-16 00:31:21', '0000-00-00 00:00:00', NULL),
(6, 8, '完成交易', '面交', '台中科技大學', '0906307318', 'Buy', NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-16 00:37:01', '2022-06-16 00:43:23', '0000-00-00 00:00:00', NULL),
(7, 9, '完成交易', '貨到付款', '台中科技大學', '0906307318', 'Buy', NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-16 00:50:23', '2022-06-16 00:52:09', '0000-00-00 00:00:00', NULL),
(8, 10, '完成交易', '面交', '台中科技大學', '09063156498', 'Rent', '2022-06-16 08:07:11', '2022-07-16 08:07:11', NULL, NULL, NULL, NULL, '2022-06-16 08:06:51', '2022-06-16 08:07:43', '0000-00-00 00:00:00', '2022-06-16 08:07:17'),
(9, 11, '完成交易', '面交', '台中科技大學', '0906036984', 'Rent', '2022-06-16 08:11:17', '2022-07-16 08:11:17', NULL, NULL, NULL, NULL, '2022-06-16 08:10:54', '2022-06-16 08:11:56', '0000-00-00 00:00:00', '2022-06-16 08:11:22'),
(10, 12, '完成交易', '面交', '台中科技大學', '0984089132', 'Rent', '2022-06-16 08:16:02', '2022-12-13 08:16:02', NULL, NULL, NULL, NULL, '2022-06-16 08:13:43', '2022-06-16 08:16:44', '0000-00-00 00:00:00', '2022-06-16 08:16:07'),
(11, 13, '完成交易', '面交', '台中科技大學', '09060849123', 'Buy', NULL, NULL, NULL, NULL, NULL, NULL, '2022-06-16 08:20:07', '2022-06-16 08:20:55', '0000-00-00 00:00:00', NULL),
(12, 14, '完成交易', '面交', '台中科技大學', '04968498', 'Rent', '2022-06-16 10:27:45', '2022-07-16 10:27:45', NULL, NULL, NULL, NULL, '2022-06-16 10:27:18', '2022-06-16 10:28:29', '0000-00-00 00:00:00', '2022-06-16 10:27:58');

-- --------------------------------------------------------

--
-- 資料表結構 `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `RoleId` int(10) UNSIGNED NOT NULL COMMENT '角色編號',
  `RoleName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名稱',
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `role`
--

INSERT INTO `role` (`RoleId`, `RoleName`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, '超級管理員', '2022-05-23 17:35:00', '2022-06-07 14:07:06', '0000-00-00 00:00:00'),
(2, '財務管理', '2022-06-07 11:19:57', '2022-06-07 11:19:57', '2022-06-07 11:31:27'),
(3, '財務管理', '2022-06-07 11:38:29', '2022-06-15 23:08:03', '0000-00-00 00:00:00'),
(6, 'asdf', '2022-06-16 07:48:01', '2022-06-16 07:55:04', '2022-06-16 07:55:14'),
(7, '公告管理者', '2022-06-16 07:55:27', '2022-06-16 10:28:46', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `rolepermissions`
--

DROP TABLE IF EXISTS `rolepermissions`;
CREATE TABLE `rolepermissions` (
  `PermissionId` int(10) UNSIGNED NOT NULL COMMENT '權限編號',
  `RoleId` int(10) UNSIGNED NOT NULL COMMENT '功能編號',
  `FunctionId` int(10) UNSIGNED NOT NULL COMMENT '功能名稱',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `rolepermissions`
--

INSERT INTO `rolepermissions` (`PermissionId`, `RoleId`, `FunctionId`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(2, 1, 2, '2022-05-23 17:36:36', '2022-05-23 17:36:36', '0000-00-00 00:00:00'),
(3, 1, 3, '2022-05-23 17:36:47', '2022-05-23 17:36:47', '0000-00-00 00:00:00'),
(4, 1, 4, '2022-05-23 17:36:47', '2022-05-23 17:36:47', '0000-00-00 00:00:00'),
(6, 1, 1, '2022-06-07 10:29:22', '2022-06-07 10:29:22', '0000-00-00 00:00:00'),
(7, 2, 5, '2022-06-07 11:19:58', '2022-06-07 11:19:58', '0000-00-00 00:00:00'),
(8, 3, 5, '2022-06-07 11:38:30', '2022-06-07 11:38:30', '0000-00-00 00:00:00'),
(10, 1, 5, '2022-06-07 14:07:07', '2022-06-07 14:07:07', '0000-00-00 00:00:00'),
(11, 3, 2, '2022-06-15 23:08:03', '2022-06-15 23:08:03', '0000-00-00 00:00:00'),
(12, 6, 1, '2022-06-16 07:48:02', '2022-06-16 07:48:02', '0000-00-00 00:00:00'),
(13, 6, 2, '2022-06-16 07:55:04', '2022-06-16 07:55:04', '0000-00-00 00:00:00'),
(14, 7, 1, '2022-06-16 07:55:27', '2022-06-16 07:55:27', '0000-00-00 00:00:00'),
(15, 7, 5, '2022-06-16 10:28:47', '2022-06-16 10:28:47', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `shoppingcart`
--

DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart` (
  `CartId` int(10) UNSIGNED NOT NULL COMMENT '購物車編號',
  `Member` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者編號',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `shoppingcart`
--

INSERT INTO `shoppingcart` (`CartId`, `Member`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(2, 'Account', '2022-05-10 10:46:22', '2022-05-10 10:46:22', '0000-00-00 00:00:00'),
(3, 'test5', '2022-06-07 14:12:43', '2022-06-07 14:12:43', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `shoppinglist`
--

DROP TABLE IF EXISTS `shoppinglist`;
CREATE TABLE `shoppinglist` (
  `ShoppingId` int(10) UNSIGNED NOT NULL COMMENT '購物編號',
  `CartId` int(10) UNSIGNED NOT NULL COMMENT '購物車編號',
  `ProductId` int(10) UNSIGNED NOT NULL COMMENT '商品編號',
  `Count` int(11) NOT NULL COMMENT '商品數量',
  `Type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Buy',
  `State` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '未結帳' COMMENT '清單狀態',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `shoppinglist`
--

INSERT INTO `shoppinglist` (`ShoppingId`, `CartId`, `ProductId`, `Count`, `Type`, `State`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(2, 3, 11, 30, 'Rent', '下訂單', '2022-06-15 22:44:04', '2022-06-15 22:44:30', '0000-00-00 00:00:00'),
(3, 3, 12, 122, 'Rent', '下訂單', '2022-06-15 22:46:43', '2022-06-15 22:47:01', '0000-00-00 00:00:00'),
(4, 3, 7, 48, 'Rent', '下訂單', '2022-06-15 23:51:10', '2022-06-15 23:51:24', '0000-00-00 00:00:00'),
(5, 3, 13, 1, 'Buy', '下訂單', '2022-06-16 00:07:07', '2022-06-16 00:07:35', '0000-00-00 00:00:00'),
(6, 2, 2, 2, 'Buy', '下訂單', '2022-06-16 00:29:20', '2022-06-16 00:29:40', '0000-00-00 00:00:00'),
(8, 3, 5, 2, 'Buy', '下訂單', '2022-06-16 00:34:21', '2022-06-16 00:37:01', '0000-00-00 00:00:00'),
(9, 3, 15, 4, 'Buy', '下訂單', '2022-06-16 00:49:16', '2022-06-16 00:50:23', '0000-00-00 00:00:00'),
(10, 3, 8, 30, 'Rent', '下訂單', '2022-06-16 08:05:56', '2022-06-16 08:06:51', '0000-00-00 00:00:00'),
(11, 3, 17, 30, 'Rent', '下訂單', '2022-06-16 08:10:39', '2022-06-16 08:10:55', '0000-00-00 00:00:00'),
(12, 2, 8, 180, 'Rent', '下訂單', '2022-06-16 08:13:29', '2022-06-16 08:13:44', '0000-00-00 00:00:00'),
(13, 3, 18, 1, 'Buy', '下訂單', '2022-06-16 08:19:53', '2022-06-16 08:20:08', '0000-00-00 00:00:00'),
(14, 3, 11, 30, 'Rent', '下訂單', '2022-06-16 10:27:01', '2022-06-16 10:27:18', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `taglist`
--

DROP TABLE IF EXISTS `taglist`;
CREATE TABLE `taglist` (
  `Id` int(10) UNSIGNED NOT NULL,
  `CategoryId` int(10) UNSIGNED NOT NULL COMMENT '種類編號',
  `ProductId` int(10) UNSIGNED NOT NULL COMMENT '商品編號',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `taglist`
--

INSERT INTO `taglist` (`Id`, `CategoryId`, `ProductId`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 1, 4, '2022-06-15 09:52:00', '2022-06-15 09:52:00', '0000-00-00 00:00:00'),
(2, 1, 3, '2022-06-15 09:52:07', '2022-06-15 09:52:07', '0000-00-00 00:00:00'),
(3, 1, 2, '2022-06-15 09:52:14', '2022-06-15 09:52:14', '0000-00-00 00:00:00'),
(4, 1, 1, '2022-06-15 09:52:21', '2022-06-15 09:52:21', '0000-00-00 00:00:00'),
(5, 1, 6, '2022-06-15 09:55:07', '2022-06-15 09:55:07', '0000-00-00 00:00:00'),
(6, 1, 7, '2022-06-15 09:56:51', '2022-06-15 09:56:51', '0000-00-00 00:00:00'),
(7, 19, 8, '2022-06-15 10:03:21', '2022-06-15 10:03:21', '0000-00-00 00:00:00'),
(8, 19, 9, '2022-06-15 10:05:19', '2022-06-15 10:05:19', '0000-00-00 00:00:00'),
(9, 19, 10, '2022-06-15 10:07:00', '2022-06-15 10:07:00', '0000-00-00 00:00:00'),
(10, 18, 12, '2022-06-15 10:53:32', '2022-06-15 10:53:32', '0000-00-00 00:00:00'),
(11, 4, 11, '2022-06-15 10:57:30', '2022-06-15 10:57:30', '0000-00-00 00:00:00'),
(12, 18, 13, '2022-06-15 10:58:54', '2022-06-15 10:58:54', '0000-00-00 00:00:00'),
(13, 18, 14, '2022-06-15 11:04:58', '2022-06-15 11:04:58', '0000-00-00 00:00:00'),
(14, 20, 16, '2022-06-15 11:07:59', '2022-06-15 11:07:59', '0000-00-00 00:00:00'),
(15, 18, 15, '2022-06-16 00:56:29', '2022-06-16 00:56:29', '0000-00-00 00:00:00'),
(16, 1, 5, '2022-06-16 00:56:38', '2022-06-16 00:56:38', '0000-00-00 00:00:00'),
(17, 7, 17, '2022-06-16 08:10:21', '2022-06-16 08:10:21', '0000-00-00 00:00:00'),
(18, 2, 18, '2022-06-16 08:19:30', '2022-06-16 08:19:30', '0000-00-00 00:00:00'),
(19, 7, 17, '2022-06-16 09:34:55', '2022-06-16 09:34:55', '0000-00-00 00:00:00'),
(20, 2, 20, '2022-06-16 10:25:09', '2022-06-16 10:25:09', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `userrole`
--

DROP TABLE IF EXISTS `userrole`;
CREATE TABLE `userrole` (
  `UserRoleId` int(10) UNSIGNED NOT NULL COMMENT '使用者角色編號',
  `User` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者',
  `RoleId` int(10) UNSIGNED NOT NULL COMMENT '角色編號',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `userrole`
--

INSERT INTO `userrole` (`UserRoleId`, `User`, `RoleId`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
(1, 'Account', 1, '2022-05-23 17:38:00', '2022-05-23 17:38:00', '0000-00-00 00:00:00'),
(6, 'test5', 3, '2022-06-16 10:28:54', '2022-06-16 10:28:54', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Account` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者帳號',
  `Password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者編號',
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `Email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '電子信箱',
  `EmailVerifiedAt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '信箱驗證時間',
  `AuthCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '驗證碼',
  `Money` int(11) NOT NULL DEFAULT 0 COMMENT '帳戶餘額',
  `Balance` tinyint(1) NOT NULL DEFAULT 0 COMMENT '保證金',
  `Address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `Image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '大頭貼',
  `Active` tinyint(4) DEFAULT 0 COMMENT '在線狀況',
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `DeletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`Account`, `Password`, `Name`, `Email`, `EmailVerifiedAt`, `AuthCode`, `Money`, `Balance`, `Address`, `Image`, `Active`, `CreatedAt`, `UpdatedAt`, `DeletedAt`) VALUES
('Account', '9dc68d2ca96897f90619ad3ce5ddb2fa5f9e91814b6b1a7a1ffa92dcc1a2df7c', '管理員兼賣家', 'linskybing@gmail.com', NULL, '', 4126, 1, 'asdf', 'YXNkZmFzZGY.jpg', 1, '2022-05-09 09:45:27', '2022-06-16 10:28:29', '0000-00-00 00:00:00'),
('test5', '9dc68d2ca96897f90619ad3ce5ddb2fa5f9e91814b6b1a7a1ffa92dcc1a2df7c', '買家', 'linskybing@gmail.com', NULL, '', 498, 1, NULL, '6LK35a62.jpg', 1, '2022-06-07 14:12:42', '2022-06-16 08:05:50', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `usertoken`
--

DROP TABLE IF EXISTS `usertoken`;
CREATE TABLE `usertoken` (
  `Id` int(10) UNSIGNED NOT NULL COMMENT 'Token編號',
  `Account` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者',
  `Token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `LastAccessAt` datetime NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `ExpiredAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `usertoken`
--

INSERT INTO `usertoken` (`Id`, `Account`, `Token`, `LastAccessAt`, `CreatedAt`, `UpdatedAt`, `ExpiredAt`) VALUES
(1, 'Account', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoiQWNjb3VudCIsIk5hbWUiOiLnrqHnkIblk6Hlhbzos6PlrrYiLCJSb2xlSWQiOjEsIkNhcnRJZCI6MiwiSW1hZ2UiOiJZWE5rWm1GelpHWS5qcGciLCJpYXQiOjE2NTUyNTkyMjIsImV4cCI6MTY1NTM0NTYyMn0.ZPZrBVFABy1cVRpTq3fPSPt48hopycIXdyfs3qKblZ', '2022-06-16 10:13:59', '2022-06-15 10:13:42', '2022-06-16 10:13:59', '2022-06-16 10:13:42'),
(2, 'test5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoidGVzdDUiLCJOYW1lIjoi6LK35a62IiwiUm9sZUlkIjpudWxsLCJDYXJ0SWQiOjMsIkltYWdlIjoiNkxLMzVhNjIud2VicCIsImlhdCI6MTY1NTMwNDE0MSwiZXhwIjoxNjU1MzkwNTQxfQ.vtSztftr7s9B1SaedA4dkr0d4q315v9xiysSjQve7S0', '2022-06-16 07:41:55', '2022-06-15 22:42:21', '2022-06-16 07:41:55', '2022-06-16 22:42:21');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`AnnouncementId`),
  ADD KEY `announcement_admin_foreign` (`Admin`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryId`),
  ADD UNIQUE KEY `UNIQUE` (`Tag`);

--
-- 資料表索引 `chatroom`
--
ALTER TABLE `chatroom`
  ADD PRIMARY KEY (`RoomId`),
  ADD KEY `chatroom_seller_foreign` (`Seller`),
  ADD KEY `chatroom_user_foreign` (`User`);

--
-- 資料表索引 `dealmessage`
--
ALTER TABLE `dealmessage`
  ADD PRIMARY KEY (`MessageId`),
  ADD KEY `dealmessage_recordid_foreign` (`RecordId`),
  ADD KEY `dealmessage_creator_foreign` (`Creator`);

--
-- 資料表索引 `dealreview`
--
ALTER TABLE `dealreview`
  ADD PRIMARY KEY (`ReviewId`),
  ADD KEY `dealreview_recordid_foreign` (`RecordId`);

--
-- 資料表索引 `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`DepositId`),
  ADD KEY `deposits_user_foreign` (`User`);

--
-- 資料表索引 `functionlist`
--
ALTER TABLE `functionlist`
  ADD PRIMARY KEY (`FunctionId`);

--
-- 資料表索引 `problemlist`
--
ALTER TABLE `problemlist`
  ADD PRIMARY KEY (`ProblemId`),
  ADD KEY `problemlist_postuser_foreign` (`PostUser`);

--
-- 資料表索引 `problemreply`
--
ALTER TABLE `problemreply`
  ADD PRIMARY KEY (`ProblemReply`),
  ADD KEY `problemreply_problemid_foreign` (`ProblemId`),
  ADD KEY `problemreply_replyuser_foreign` (`ReplyUser`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `product_seller_foreign` (`Seller`);

--
-- 資料表索引 `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`ImageId`),
  ADD KEY `productimage_productid_foreign` (`ProductId`);

--
-- 資料表索引 `productquestion`
--
ALTER TABLE `productquestion`
  ADD PRIMARY KEY (`QuestionId`),
  ADD KEY `productquestion_productid_foreign` (`ProductId`),
  ADD KEY `productquestion_customer_foreign` (`Customer`),
  ADD KEY `productquestion_seller_foreign` (`Seller`);

--
-- 資料表索引 `recordchat`
--
ALTER TABLE `recordchat`
  ADD PRIMARY KEY (`ChatId`),
  ADD KEY `recordchat_roomid_foreign` (`RoomId`),
  ADD KEY `recordchat_creator_foreign` (`Creator`);

--
-- 資料表索引 `recorddeal`
--
ALTER TABLE `recorddeal`
  ADD PRIMARY KEY (`RecordId`),
  ADD KEY `recorddeal_shoppingid_foreign` (`ShoppingId`);

--
-- 資料表索引 `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleId`);

--
-- 資料表索引 `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD PRIMARY KEY (`PermissionId`),
  ADD KEY `rolepermissions_functionid_foreign` (`FunctionId`),
  ADD KEY `rolepermissions_roleid_foreign` (`RoleId`);

--
-- 資料表索引 `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD PRIMARY KEY (`CartId`),
  ADD KEY `shoppingcart_member_foreign` (`Member`);

--
-- 資料表索引 `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD PRIMARY KEY (`ShoppingId`),
  ADD KEY `shoppinglist_cartid_foreign` (`CartId`),
  ADD KEY `shoppinglist_productid_foreign` (`ProductId`);

--
-- 資料表索引 `taglist`
--
ALTER TABLE `taglist`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `taglist_categoryid_foreign` (`CategoryId`),
  ADD KEY `taglist_productid_foreign` (`ProductId`);

--
-- 資料表索引 `userrole`
--
ALTER TABLE `userrole`
  ADD PRIMARY KEY (`UserRoleId`),
  ADD KEY `userrole_user_foreign` (`User`),
  ADD KEY `userrole_roleid_foreign` (`RoleId`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Account`);

--
-- 資料表索引 `usertoken`
--
ALTER TABLE `usertoken`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `usertoken_account_foreign` (`Account`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `announcement`
--
ALTER TABLE `announcement`
  MODIFY `AnnouncementId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '公告編號', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `category`
--
ALTER TABLE `category`
  MODIFY `CategoryId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '種類編號', AUTO_INCREMENT=24;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `chatroom`
--
ALTER TABLE `chatroom`
  MODIFY `RoomId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '聊天室編號', AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `dealmessage`
--
ALTER TABLE `dealmessage`
  MODIFY `MessageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '訊息編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `dealreview`
--
ALTER TABLE `dealreview`
  MODIFY `ReviewId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '評價編號', AUTO_INCREMENT=12;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `deposits`
--
ALTER TABLE `deposits`
  MODIFY `DepositId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '存款編號', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `functionlist`
--
ALTER TABLE `functionlist`
  MODIFY `FunctionId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '功能編號', AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `problemlist`
--
ALTER TABLE `problemlist`
  MODIFY `ProblemId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '問題編號', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `problemreply`
--
ALTER TABLE `problemreply`
  MODIFY `ProblemReply` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '回覆編號', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `ProductId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品編號', AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `productimage`
--
ALTER TABLE `productimage`
  MODIFY `ImageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品圖片編號', AUTO_INCREMENT=20;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `productquestion`
--
ALTER TABLE `productquestion`
  MODIFY `QuestionId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '問題編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `recordchat`
--
ALTER TABLE `recordchat`
  MODIFY `ChatId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '聊天訊息編號', AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `recorddeal`
--
ALTER TABLE `recorddeal`
  MODIFY `RecordId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '交易編號', AUTO_INCREMENT=13;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `role`
--
ALTER TABLE `role`
  MODIFY `RoleId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色編號', AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `rolepermissions`
--
ALTER TABLE `rolepermissions`
  MODIFY `PermissionId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '權限編號', AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `shoppingcart`
--
ALTER TABLE `shoppingcart`
  MODIFY `CartId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '購物車編號', AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `shoppinglist`
--
ALTER TABLE `shoppinglist`
  MODIFY `ShoppingId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '購物編號', AUTO_INCREMENT=15;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `taglist`
--
ALTER TABLE `taglist`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userrole`
--
ALTER TABLE `userrole`
  MODIFY `UserRoleId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '使用者角色編號', AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `usertoken`
--
ALTER TABLE `usertoken`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Token編號', AUTO_INCREMENT=3;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `announcement`
--
ALTER TABLE `announcement`
  ADD CONSTRAINT `announcement_admin_foreign` FOREIGN KEY (`Admin`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `chatroom`
--
ALTER TABLE `chatroom`
  ADD CONSTRAINT `chatroom_seller_foreign` FOREIGN KEY (`Seller`) REFERENCES `users` (`Account`),
  ADD CONSTRAINT `chatroom_user_foreign` FOREIGN KEY (`User`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `dealmessage`
--
ALTER TABLE `dealmessage`
  ADD CONSTRAINT `dealmessage_creator_foreign` FOREIGN KEY (`Creator`) REFERENCES `users` (`Account`),
  ADD CONSTRAINT `dealmessage_recordid_foreign` FOREIGN KEY (`RecordId`) REFERENCES `recorddeal` (`RecordId`);

--
-- 資料表的限制式 `dealreview`
--
ALTER TABLE `dealreview`
  ADD CONSTRAINT `dealreview_recordid_foreign` FOREIGN KEY (`RecordId`) REFERENCES `recorddeal` (`RecordId`);

--
-- 資料表的限制式 `deposits`
--
ALTER TABLE `deposits`
  ADD CONSTRAINT `deposits_user_foreign` FOREIGN KEY (`User`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `problemlist`
--
ALTER TABLE `problemlist`
  ADD CONSTRAINT `problemlist_postuser_foreign` FOREIGN KEY (`PostUser`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `problemreply`
--
ALTER TABLE `problemreply`
  ADD CONSTRAINT `problemreply_problemid_foreign` FOREIGN KEY (`ProblemId`) REFERENCES `problemlist` (`ProblemId`),
  ADD CONSTRAINT `problemreply_replyuser_foreign` FOREIGN KEY (`ReplyUser`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_seller_foreign` FOREIGN KEY (`Seller`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `productimage`
--
ALTER TABLE `productimage`
  ADD CONSTRAINT `productimage_productid_foreign` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`);

--
-- 資料表的限制式 `productquestion`
--
ALTER TABLE `productquestion`
  ADD CONSTRAINT `productquestion_customer_foreign` FOREIGN KEY (`Customer`) REFERENCES `users` (`Account`),
  ADD CONSTRAINT `productquestion_productid_foreign` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`),
  ADD CONSTRAINT `productquestion_seller_foreign` FOREIGN KEY (`Seller`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `recordchat`
--
ALTER TABLE `recordchat`
  ADD CONSTRAINT `recordchat_creator_foreign` FOREIGN KEY (`Creator`) REFERENCES `users` (`Account`),
  ADD CONSTRAINT `recordchat_roomid_foreign` FOREIGN KEY (`RoomId`) REFERENCES `chatroom` (`RoomId`);

--
-- 資料表的限制式 `recorddeal`
--
ALTER TABLE `recorddeal`
  ADD CONSTRAINT `recorddeal_shoppingid_foreign` FOREIGN KEY (`ShoppingId`) REFERENCES `shoppinglist` (`ShoppingId`);

--
-- 資料表的限制式 `rolepermissions`
--
ALTER TABLE `rolepermissions`
  ADD CONSTRAINT `rolepermissions_functionid_foreign` FOREIGN KEY (`FunctionId`) REFERENCES `functionlist` (`FunctionId`),
  ADD CONSTRAINT `rolepermissions_roleid_foreign` FOREIGN KEY (`RoleId`) REFERENCES `role` (`RoleId`);

--
-- 資料表的限制式 `shoppingcart`
--
ALTER TABLE `shoppingcart`
  ADD CONSTRAINT `shoppingcart_member_foreign` FOREIGN KEY (`Member`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `shoppinglist`
--
ALTER TABLE `shoppinglist`
  ADD CONSTRAINT `shoppinglist_cartid_foreign` FOREIGN KEY (`CartId`) REFERENCES `shoppingcart` (`CartId`),
  ADD CONSTRAINT `shoppinglist_productid_foreign` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`);

--
-- 資料表的限制式 `taglist`
--
ALTER TABLE `taglist`
  ADD CONSTRAINT `taglist_categoryid_foreign` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`),
  ADD CONSTRAINT `taglist_productid_foreign` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`);

--
-- 資料表的限制式 `userrole`
--
ALTER TABLE `userrole`
  ADD CONSTRAINT `userrole_roleid_foreign` FOREIGN KEY (`RoleId`) REFERENCES `role` (`RoleId`),
  ADD CONSTRAINT `userrole_user_foreign` FOREIGN KEY (`User`) REFERENCES `users` (`Account`);

--
-- 資料表的限制式 `usertoken`
--
ALTER TABLE `usertoken`
  ADD CONSTRAINT `usertoken_account_foreign` FOREIGN KEY (`Account`) REFERENCES `users` (`Account`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
