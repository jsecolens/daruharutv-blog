'use client';

import { useState, useMemo } from 'react';
import universitiesData from '@/data/universities.json';

interface University {
  id: number;
  type: string;
  category: string;
  region: string;
  name: string;
  recruitmentUrl: string;
  previousUrl: string;
  note: string;
}

export default function RecruitmentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');

  const universities: University[] = universitiesData.universities;

  // URL에서 도메인 추출 함수
  const extractDomain = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return '';
    }
  };

  // 지역 목록 추출
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(universities.map(u => u.region)));
    return ['전체', ...uniqueRegions.sort()];
  }, [universities]);

  // 필터링된 대학 목록
  const filteredUniversities = useMemo(() => {
    return universities.filter(university => {
      const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === '전체' || university.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [universities, searchTerm, selectedRegion]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎓 전국 사립대학교 채용 공고 검색
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          전국 사립대학교 교직원 채용 정보
        </p>
        <p className="text-sm text-gray-500">
          Ver.23 | 대학 리스트: 교육부 대학알리미 기준
        </p>
      </header>

      {/* 안내 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-3">📌 이용 안내</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• 저 역시 교직원 취업을 준비하면서 각 대학의 채용 공고를 찾는 것이 얼마나 어려운지 직접 경험했습니다.</li>
          <li>• 대학 홈페이지마다 구조가 달라 채용 공고 게시판을 찾는 것조차 쉽지 않았고, 하나하나 검색하는 데 많은 시간이 소요되었습니다.</li>
          <li>• 이러한 어려움을 겪으신 분들께 조금이나마 도움을 드리고자, 전국 4년제 사립대학교의 일반행정직 채용 공고 사이트를 한곳에 정리했습니다.</li>
          <li>• 여기서 바로 각 대학의 채용 공고 사이트에 접속할 수 있어 시간을 크게 절약할 수 있습니다.</li>
          <li>• 대학 이름으로 검색하거나 지역별로 필터링하여 원하는 대학을 쉽게 찾을 수 있습니다.</li>
          <li>• 📢 채용 공고 링크는 지속적으로 업데이트하고 있습니다.</li>
        </ul>
      </div>

      {/* 유의사항 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-3">⚠️ 유의사항</h2>
        <ul className="text-xs text-gray-600 space-y-2">
          <li>• 본 페이지는 취업 준비생들의 편의를 위해 <strong>참고 자료로만</strong> 제공됩니다.</li>
          <li>• 일부 대학의 경우 채용 공고가 비공개되거나 링크가 변경될 수 있으며, 정보의 정확성과 최신성을 보장하지 않습니다.</li>
          <li>• 제공된 채용 공고 링크는 시간이 지남에 따라 변경되거나 보안상 안전하지 않을 수 있으므로, 접속 시 주의하시기 바라며 이와 관련한 어떠한 문제에 대해서도 책임을 지지 않습니다.</li>
          <li>• 최종 지원 전에는 반드시 해당 대학의 공식 홈페이지에서 직접 확인하시기 바랍니다.</li>
          <li>• 본 정보의 이용으로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다.</li>
        </ul>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-gray-300 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* 검색 */}
          <div>
            <label htmlFor="search" className="block text-sm font-bold text-gray-800 mb-2">
              🔍 대학 이름 검색
            </label>
            <input
              id="search"
              type="text"
              placeholder="예: 서울대학교, 연세대학교..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>

          {/* 지역 필터 */}
          <div>
            <label htmlFor="region" className="block text-sm font-bold text-gray-800 mb-2">
              📍 지역 선택
            </label>
            <select
              id="region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 검색 결과 수 */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            총 <span className="font-bold text-blue-600">{filteredUniversities.length}</span>개 대학
          </p>
        </div>
      </div>

      {/* 대학 목록 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <div
            key={university.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* 대학 이름 */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {university.name}
            </h3>

            {/* 지역 */}
            <p className="text-sm text-gray-600 mb-4 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {university.region}
            </p>

            {/* 링크 버튼 */}
            <div className="space-y-3">
              {university.recruitmentUrl && (
                <div>
                  <a
                    href={university.recruitmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    📄 채용 공고 사이트
                  </a>
                  <p className="text-xs text-gray-500 text-center mt-1 truncate px-2">
                    🔗 {extractDomain(university.recruitmentUrl)}
                  </p>
                </div>
              )}
              {university.previousUrl && (
                <div>
                  <a
                    href={university.previousUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    📋 이전 채용 공고
                  </a>
                  <p className="text-xs text-gray-500 text-center mt-1 truncate px-2">
                    🔗 {extractDomain(university.previousUrl)}
                  </p>
                </div>
              )}
              {!university.recruitmentUrl && !university.previousUrl && (
                <p className="text-sm text-gray-500 text-center py-2">
                  📋 채용 공고 확인 중
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 검색 결과 없음 */}
      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">다른 검색어나 지역을 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}
