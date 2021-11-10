# 2021-1-CECD3-KimLeeHongCho-6



## 1. 프로젝트 명
비대면 환경에서의 효과적인 교육 및 비즈니스를 위한 개인 맞춤형 융합 콘텐츠 생성 기반 기술



## 2. 프로젝트 개요
비대면 환경에서의 소통의 핵심은 영상이고, 영상을 중심으로 협업/교육/비즈니스/채팅 분야와 결합이 이루어지고 있다. 영상과 결합될 수 있는 다양한 정보를 시간, 즉 러닝타임으로 매칭시키려고 하며, 그때 가장 적절한 기반 기술이 자막이라고 생각된다. 그 중에서 교육 분야에 중점을 두고, 사용자가 비대면 환경에서 효과적으로 학습을 수행할 수 있는 교육 환경 조성을 위해 개인 맞춤형 자막 에디터, HTML 플레이어에서의 오버레이 자막 뷰어를 개발하고자 한다.



## 3. 프로젝트 목표
1. 사용자가 자막을 관리할 수 있는 통합적인 기능
   - 자막 생성, 수정, 삭제, 저장
2. 실시간 및 로컬 영상의 자동 자막 생성
   - 음성인식 엔진 사용
3. 영상에 참고할 수 있는 파일의 자막화
   - ODF 형식의 파일 사용
4. 생성된/저장된 자막에서 원하는 키워드 검색
5. 자막 클릭 시 매칭 되는 영상 부분을 재생



## 4. 시스템 구성도
![시스템구성도](https://user-images.githubusercontent.com/62579567/141189318-dcb847ca-b9eb-4e62-b821-e237c0d6c460.png)




## 5. 실행방법
로컬 서버를 구동하여 실행이 가능함
   1) npm 설치
      - https://nodejs.org/en/
```
git clone https://github.com/CSID-DGU/2021-1-CECD3-KimLeeHongCho-6.git

cd 2021-1-CECD3-KimLeeHongCho-6

npm install

npm start
```



## 6. 결과물

- 웹 구현

1) 자막을 생성하는 CREATE 페이지
   * 기본 화면
   ![image](https://user-images.githubusercontent.com/62579567/141190404-e43ba6ab-15a2-4d9d-b648-800a61beaa34.png)
   
   * 음성인식 API를 사용한 자동 자막 생성
   ![image](https://user-images.githubusercontent.com/62579567/141191263-9e05085f-a474-4e9a-a9d0-7c7652552496.png)
   ![image](https://user-images.githubusercontent.com/62579567/141191683-d9873ad5-fb66-4572-9635-3a2b791e0ddb.png)
   
   * 사용자가 가지고 있는 odf 파일을 사용한 자막 생성
   ![image](https://user-images.githubusercontent.com/62579567/141191936-d35190e9-7f26-44fe-a69b-67802e13aec5.png)
      + 선택된 odf 파일에서 텍스트만 추출
      ![image](https://user-images.githubusercontent.com/62579567/141192051-d67ec09b-3966-480f-930c-960882c157af.png)
      
   * 사용자 생성 자막
   ![image](https://user-images.githubusercontent.com/62579567/141192253-55db1381-0988-4d81-a1dd-0cefdb35604b.png)

2) 영상과 자막을 출력하는 영상 플레이어 PLAYER 페이지
   * 영상 플레이어 기능 - 자막 오버레이, 영상 시간대 자막 하이라이트, 자막 검색, 선택 자막 이동
   ![image](https://user-images.githubusercontent.com/62579567/141192664-c667bbe8-98e7-40bb-a545-39ab17b0e71a.png)
   
      + 동영상이 재생됨에 따라 해당되는 부분의 자막이 녹색으로 표시됨
      ![3](https://user-images.githubusercontent.com/43579755/122676135-8b6a1c80-d217-11eb-8806-98a84ff41e3c.gif)
      
      + 자막 검색 기능
      ![image](https://user-images.githubusercontent.com/62579567/141193077-d1b6543c-1565-41f5-818f-d2e43a577a20.png)

      + 선택한 자막(문장)에 해당하는 부분부터 동영상 재생 가능
      ![4](https://user-images.githubusercontent.com/43579755/122699747-f56cdb00-d284-11eb-9e88-51d31827e968.gif)


3) 자막을 편집하는 EDITOR 페이지
   * ![image](https://user-images.githubusercontent.com/62579567/141193434-d69af2f9-4880-4b67-b7a3-89f1b822bbd7.png)



## 7. 팀원
김윤호

이유경

조민지 (팀장)

홍은주
