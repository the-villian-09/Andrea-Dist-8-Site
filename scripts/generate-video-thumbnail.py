import cv2
import os

video_path = 'assets/galleries/Meet_and_Greet_9-11-2026/c62179d3-18e4-4435-89bb-f13ded169e55.mp4'
output_path = 'assets/galleries/Meet_and_Greet_9-11-2026/video-thumbnail.jpg'

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print('Could not open video')
else:
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    target_frame = min(30, total_frames // 4)
    cap.set(cv2.CAP_PROP_POS_FRAMES, target_frame)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(output_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 60])
        print(f'Saved thumbnail to {output_path}')
    else:
        print('Could not read frame')
    cap.release()
