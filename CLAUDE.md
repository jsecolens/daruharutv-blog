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
---
```

### 5. 본문 구조
```
안녕하세요, **다루하루TV**입니다!

<img src="/images/파일명.jpg" alt="설명" style="max-width: 700px; width: 100%; height: auto; margin: 2rem auto; display: block; border-radius: 12px;" />

도입부 내용...

---

## 섹션 제목

본문 내용...

---

## 마치며

마무리 내용...

---

**관련 콘텐츠가 더 궁금하시다면?**
[다루하루TV 유튜브 채널](https://www.youtube.com/@daruharutv)에서 대학교 교직원 취업 준비에 관한 더 많은 이야기를 만나보세요!
```

### 6. 유튜브 영상
- frontmatter의 `youtube` 필드에 embed URL 설정
- URL 변환: `https://youtu.be/VIDEO_ID` → `https://www.youtube.com/embed/VIDEO_ID`

### 7. Git 커밋 & 푸시
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
| `notice` | 공지사항 |

새 카테고리 추가 시: `src/lib/posts.ts`의 `categoryNameMap` 수정 필요

## 주의사항
- 토큰/비밀번호를 대화에 직접 입력하지 말 것 (SSH 키 인증 설정 완료됨)
- 이미지는 반드시 압축 후 사용
- 날짜 형식: `YYYY-MM-DD` (따옴표 필수)
- **날짜는 반드시 시스템의 "오늘 날짜"를 사용할 것 (직접 추측하지 말고 현재 날짜를 정확히 확인)**
- 포스트 정렬: 날짜 기준 최신순
