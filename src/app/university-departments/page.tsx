import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '대학교 부서와 하는 일 - 다루하루TV',
  description: '대학교 주요 부서의 역할과 업무를 알아보세요.',
};

const departments = [
  {
    name: '교무처',
    description: '학사 관리, 교육과정 운영, 수업 및 시험 관리',
    tasks: [
      '수업 시간표 작성 및 관리',
      '성적 관리 및 학점 인정',
      '교육과정 개편 및 운영',
      '강의평가 시행',
    ],
  },
  {
    name: '학생처',
    description: '학생 생활 지원, 장학금 관리, 학생 상담',
    tasks: [
      '장학금 선발 및 지급',
      '학생 상담 및 심리 지원',
      '동아리 및 학생회 지원',
      '학생 복지 프로그램 운영',
    ],
  },
  {
    name: '입학처',
    description: '신입생 및 편입생 선발, 입학 전형 관리',
    tasks: [
      '입학 전형 계획 수립',
      '입학 설명회 및 홍보',
      '전형 관리 및 합격자 선발',
      '신입생 오리엔테이션',
    ],
  },
  {
    name: '총무처',
    description: '예산 관리, 시설 관리, 물품 구매',
    tasks: [
      '예산 편성 및 집행',
      '교내 시설 유지 보수',
      '물품 구매 및 관리',
      '계약 업무 처리',
    ],
  },
  {
    name: '기획처',
    description: '대학 발전 계획 수립, 평가 및 인증',
    tasks: [
      '중장기 발전계획 수립',
      '대학평가 및 인증 준비',
      '대학 정보공시',
      '각종 통계 자료 관리',
    ],
  },
  {
    name: '산학협력단',
    description: '산학협력 및 연구 지원',
    tasks: [
      '산학협력 프로젝트 관리',
      '연구비 관리 및 정산',
      '기술이전 및 특허 관리',
      '산학협력 MOU 체결',
    ],
  },
];

export default function UniversityDepartmentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <header className="mb-12">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">대학교 부서와 하는 일</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">대학교 부서와 하는 일</h1>
        <p className="text-xl text-gray-600">
          대학교의 주요 부서들이 어떤 일을 하는지 알아보세요.
        </p>
      </header>

      {/* 소개 */}
      <section className="bg-blue-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">왜 중요한가요?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          교직원 채용 준비 시 각 부서의 역할과 업무를 이해하는 것은 매우 중요합니다.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>면접에서 지원 부서에 대한 이해도를 평가받습니다</li>
          <li>자기소개서 작성 시 구체적인 업무 이해가 필요합니다</li>
          <li>입사 후 빠른 적응에 도움이 됩니다</li>
        </ul>
      </section>

      {/* 부서 목록 */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {departments.map((dept, index) => (
          <article
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                <p className="text-gray-600 text-sm">{dept.description}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">주요 업무</h4>
              <ul className="space-y-1">
                {dept.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="text-sm text-gray-600 flex items-start">
                    <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* 팁 */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 면접 준비 팁</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            <strong className="text-gray-900">지원 부서 깊이 있게 조사하기:</strong><br/>
            해당 대학 홈페이지에서 지원 부서의 최근 활동과 주요 사업을 확인하세요.
          </p>
          <p>
            <strong className="text-gray-900">유사 부서와의 차이점 파악:</strong><br/>
            비슷한 역할을 하는 다른 부서와의 차이점을 명확히 이해하세요.
          </p>
          <p>
            <strong className="text-gray-900">개선 아이디어 준비:</strong><br/>
            해당 부서의 업무를 개선할 수 있는 구체적인 아이디어를 준비하세요.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          블로그 홈으로
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
