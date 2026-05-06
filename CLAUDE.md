# 다루하루TV 블로그 발행 가이드

## 프로젝트 개요
- Next.js 기반 블로그 (daruharutv.com)
- Vercel 연동: GitHub master 브랜치 푸시 시 자동 배포
- Git remote: `git@github.com:jsecolens/daruharutv-blog.git` (SSH)

## 글 발행 절차

### 1. 원본 글 확인
- 사용자가 바탕화면에 `.md` 파일을 준비함

### 2. 이미지 처리
- 저장 위치: `public/images/`
- 원본 이미지를 JPEG로 변환 및 압축 (목표: 100KB 이하)
- 압축 명령어:
  ```bash
  sips -s format jpeg -s formatOptions 75 -Z 800 "원본경로" --out "public/images/파일명.jpg"
  ```
- 파일명: 포스트 slug과 동일하게 (예: `bad-complaints.jpg`)

### 3. 포스트 파일 생성
- 저장 위치: `content/posts/`
- 파일명: 영문 kebab-case (예: `bad-complaints.md`)

### 4. Frontmatter 형식
```yaml
---
title: "포스트 제목"
date: "YYYY-MM-DD"
category: "카테고리-slug"
excerpt: "포스트 요약 (50~100자)"
featured: false
image: "/images/파일명.jpg"
youtube: "https://www.youtube.com/embed/VIDEO_ID"
relatedPosts: ["관련글-slug-1", "관련글-slug-2", "관련글-slug-3"]
series:                       # 시리즈 글일 때만 추가 (선택)
  name: "시리즈 이름"
  order: 1
---
```

- `relatedPosts`: 현재 글과 주제·카테고리가 유사한 기존 포스트 slug을 2~3개 지정 (필수). 사이트에서 카드 형태로 자동 노출됨.
- `series`: 같은 시리즈에 속한 글 그룹. 같은 `name`을 공유하는 글들은 포스트 페이지 상단에 자동으로 시리즈 네비게이션 위젯으로 노출됨. `order`는 1부터 시작하는 정수.

### 5. 본문 구조

#### 5-1. 일반 카테고리 (기본 구조)
```
안녕하세요, 다루하루TV입니다!

<img src="/images/파일명.jpg" alt="설명" style="max-width: 700px; width: 100%; height: auto; margin: 2rem auto; display: block; border-radius: 12px;" />

도입부 내용...

---

## 섹션 제목

본문 내용...

---

## 마치며

마무리 내용...

---

## 함께 읽으면 좋은 글

- [관련글 제목 1](/post/관련글-slug-1)
- [관련글 제목 2](/post/관련글-slug-2)
- [관련글 제목 3](/post/관련글-slug-3)

---

관련 콘텐츠가 더 궁금하시다면?
[다루하루TV 유튜브 채널](https://www.youtube.com/@daruharutv)에서 대학교 교직원 취업 준비에 관한 더 많은 이야기를 만나보세요!
```

#### 5-2. 자격증 카테고리 (`certification`) - 도입부/마무리 멘트 제외
자격증 카테고리는 정보 전달 중심 글이라, "안녕하세요, 다루하루TV입니다!" 도입부 인사와 말미의 "관련 콘텐츠가 더 궁금하시다면... 다루하루TV 유튜브 채널" 마무리 멘트를 **생략**합니다.

```
<img src="/images/파일명.jpg" alt="설명" style="max-width: 700px; width: 100%; height: auto; margin: 2rem auto; display: block; border-radius: 12px;" />

본문 도입 단락 (원글의 첫 단락을 그대로 사용)

---

## 섹션 제목

본문 내용...

---

## 마무리

자격증 요약 및 추천 대상 정리...

---

## 함께 읽으면 좋은 글

- [관련글 제목 1](/post/관련글-slug-1)
- [관련글 제목 2](/post/관련글-slug-2)
- [관련글 제목 3](/post/관련글-slug-3)
```

### 6. 관련 글 (relatedPosts)
- 모든 신규 포스트는 **frontmatter의 `relatedPosts` 필드**와 **본문 말미의 "함께 읽으면 좋은 글" 섹션**을 함께 설정 (중복 노출이지만 SEO·내부링크 측면에서 둘 다 유지)
- 본문 링크 형식: `- [포스트 제목](/post/slug)`
- 관련 글 선정 기준:
  - 같은 카테고리 내 직전/후속 포스트 우선
  - 주제·키워드가 연관된 타 카테고리 글도 포함 가능
  - 반드시 존재하는 slug인지 `content/posts/` 확인 후 지정

### 7. 유튜브 영상
- frontmatter의 `youtube` 필드에 embed URL 설정 (없으면 생략)
- URL 변환: `https://youtu.be/VIDEO_ID` → `https://www.youtube.com/embed/VIDEO_ID`

### 8. Git 커밋 & 푸시
```bash
git add content/posts/파일명.md public/images/이미지명.jpg
git commit -m "Add new post: 포스트 제목 (파일명.md)"
git push origin master
```

## 카테고리 목록

| slug | 표시 이름 |
|------|-----------|
| `edu-career` | 교직원 취업 준비 |
| `university-departments` | 대학교 부서와 하는 일 |
| `ai-job` | 취업과 AI |
| `office-life` | 회사 생활 |
| `toeic-study` | TOEIC 공부 |
| `certification` | 자격증 |
| `notice` | 공지사항 |

새 카테고리 추가 시: `src/lib/posts.ts`의 `categoryNameMap` 수정 필요

## 주의사항
- 토큰/비밀번호를 대화에 직접 입력하지 말 것 (SSH 키 인증 설정 완료됨)
- 이미지는 반드시 압축 후 사용
- 날짜 형식: `YYYY-MM-DD` (따옴표 필수)
- 날짜는 반드시 시스템의 "오늘 날짜"를 사용할 것 (직접 추측하지 말고 현재 날짜를 정확히 확인)
- 본문에 볼드체(**) 마크다운 사용 금지
- 포스트 정렬: 날짜 기준 최신순
- 자격증(`certification`) 카테고리 글은 "안녕하세요, 다루하루TV입니다!" 인사말과 말미의 유튜브 채널 홍보 멘트 제외
- 관련 글(`relatedPosts`)은 모든 포스트에 필수 지정 + 본문 하단 "함께 읽으면 좋은 글" 섹션에도 링크 삽입
