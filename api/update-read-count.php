<?php
header('Content-Type: application/json');

function updateReadCount($postPath) {
    $countsFile = '../data/read-counts.json';
    
    // 读取现有计数
    if (file_exists($countsFile)) {
        $counts = json_decode(file_get_contents($countsFile), true);
    } else {
        $counts = [];
    }
    
    // 更新计数
    if (!isset($counts[$postPath])) {
        $counts[$postPath] = 0;
    }
    $counts[$postPath]++;
    
    // 保存更新后的计数
    file_put_contents($countsFile, json_encode($counts, JSON_PRETTY_PRINT));
    
    return $counts[$postPath];
}

// 获取请求数据
$data = json_decode(file_get_contents('php://input'), true);
$postPath = $data['path'] ?? null;

if ($postPath) {
    $count = updateReadCount($postPath);
    echo json_encode(['success' => true, 'count' => $count]);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No post path provided']);
} 