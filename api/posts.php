<?php
header('Content-Type: application/json');

function parseMarkdownFrontMatter($content) {
    $pattern = '/^---\n(.*?)\n---\n(.*)/s';
    preg_match($pattern, $content, $matches);
    
    if (count($matches) >= 3) {
        $frontMatter = yaml_parse($matches[1]);
        $content = $matches[2];
        return array_merge($frontMatter, ['content' => $content]);
    }
    
    return null;
}

function getPosts($category = null, $search = null) {
    $posts = [];
    $postsDir = '../posts';
    
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($postsDir)
    );
    
    foreach ($iterator as $file) {
        if ($file->isFile() && $file->getExtension() === 'md') {
            $content = file_get_contents($file->getPathname());
            $post = parseMarkdownFrontMatter($content);
            
            if ($post) {
                $post['path'] = str_replace('../posts/', '', $file->getPathname());
                
                // 应用过滤条件
                if ($category && $category !== '全部' && $post['category'] !== $category) {
                    continue;
                }
                
                if ($search && !stripos($post['title'], $search) && !stripos($post['content'], $search)) {
                    continue;
                }
                
                $posts[] = $post;
            }
        }
    }
    
    // 按日期排序
    usort($posts, function($a, $b) {
        return strtotime($b['date']) - strtotime($a['date']);
    });
    
    return $posts;
}

$category = $_GET['category'] ?? null;
$search = $_GET['search'] ?? null;

$posts = getPosts($category, $search);
echo json_encode($posts); 