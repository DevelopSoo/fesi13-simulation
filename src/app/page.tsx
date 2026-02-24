"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. 장면 만들기
    const scene = new THREE.Scene();

    // 5. 배경색 설정하기
    scene.background = new THREE.Color("#f0f0f0");

    // 2. canvas 에 장면 그리기
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    // 4. 카메라 만들기
    // 첫 번째 파라미터(시야각): 값이 클수록 더 넓은 범위를 볼 수 있음
    // 두 번째 파라미터(가로 세로 비율): 정사각형 비율로 보여줌
    const camera = new THREE.PerspectiveCamera(130, 1);
    // 카메라 위치 설정
    // x축, y축, z축
    camera.position.set(0, 0, 5);

    // 6. 조명 추가하기
    // 첫 번째 파라미터: 조명색 (0xffffff: 흰색 (16진수))
    // 두 번째 파라미터: 강도 (3)
    const mainLight = new THREE.DirectionalLight(0xffffff, 3);
    // 조명 위치 설정
    mainLight.position.set(0, 0, 5);
    scene.add(mainLight); // 장면에 조명 추가

    // 8. 뒷 배경 조명 추가하기
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);

    // 7. 직접 회전하기
    // OrbitControls: 마우스(또는 터치)로 3D 장면을 회전, 확대/축소, 이동할 수 있게 해주는 컨트롤러
    const controls = new OrbitControls(camera, canvasRef.current);
    // 관성 효과(부드러운 감속 효과)를 활성화 -> 마우스를 놓았을 때도 약간 더 부드럽게 움직임이 멈춤
    controls.enableDamping = true;
    // 관성 효과의 감쇠(저항) 정도를 설정 -> 값이 클수록 더 빨리 멈추고, 작을수록 더 천천히 멈춤
    controls.dampingFactor = 0.05;
    // false로 하면 일반적으로 3D 모델을 중심으로 회전/이동하게 됨
    controls.screenSpacePanning = false;
    // 카메라가 모델(중심점)에서 얼마나 가까이 접근할 수 있는지 최소 거리를 설정
    controls.minDistance = 4;
    // 카메라가 모델(중심점)에서 얼마나 멀리 떨어질 수 있는지 최대 거리를 설정
    controls.maxDistance = 10;
    // 카메라가 위/아래로 회전할 수 있는 최대 각도를 설정 -> Math.PI(180도)이므로, 카메라가 모델의 아래쪽까지도 볼 수 있음
    controls.maxPolarAngle = Math.PI;

    // 3. 모델 불러오기
    const loader = new GLTFLoader();
    loader.load("/planet/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      function animate() {
        // 사용자의 입력(마우스 드래그, 관성 등)에 따라 카메라 위치 업데이트
        controls.update();
        // 화면에 렌더링
        renderer.render(scene, camera);
        // requestAnimationFrame으로 애니메이션 루프 시작
        requestAnimationFrame(animate);
      }
      animate();
    });

    // 클린업
    return () => {
      controls.dispose(); // OrbitControls에서 이벤트 리스너 등 내부적으로 등록한 리소스를 해제
      renderer.dispose(); // WebGLRenderer가 사용한 GPU 리소스(텍스처, 버퍼 등)를 해제
      scene.clear(); // 씬에 추가된 오브젝트, 조명 등을 모두 제거
    };
  }, []);

  return (
    // 모델을 보여줄 캔버스 만들기
    <div className="h-[500px] w-[500px]">
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}
