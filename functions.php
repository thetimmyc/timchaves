<?php
/**
 * ContentBerg Child Theme functions.php
 *
 * Please refer to contentberg/functions.php about framework setup.
 */

/**
 * Enqueue the CSS. Please note the CSS order is as follows:
 *
 *  - contentberg/style.css
 *  - contentberg/css/skin-XYZ.css
 *  - contentberg-child/style.css
 *  - Inline Custom CSS from Customize
 */
function my_ts_enqueue_parent() {

	wp_enqueue_style(
		'contentberg-core', 
		get_template_directory_uri() . '/style.css', 
		array(), 
		Bunyad::options()->get_config('theme_version')
	);
}

function my_ts_enqueue_child() {

	wp_enqueue_style(
		'contentberg-child',
		get_stylesheet_uri(),
        array(), // Added -- without this param, it was causing a bug where theme version was tied to Wordpress version (5.0.3 at time of writing this)
        wp_get_theme()->get('Version') // edited this to use the Version in the child style.css file
	);
}

// Enqueue parent CSS at priority 9 as skin and other CSS generates at priority 10
add_action('wp_enqueue_scripts', 'my_ts_enqueue_parent', 9);

// Change 11 to 100 to make it enqueue AFTER Custom CSS from Customize
add_action('wp_enqueue_scripts', 'my_ts_enqueue_child', 11);

// Disable parent CSS enqueue
add_filter('bunyad_enqueue_core_css', '__return_false');

/* Book shortcode widget */
function books_widget_shortcode($atts = [], $content = null, $tag = '')
{
    global $post;
    $books = json_decode(get_post_meta( $post->ID, 'books', true ));

    if ($books) {
        $o = '';
        $o .= '<li class="widget books-widget">';
        $o .= '  <h5 class="widget-title">Books that influenced this article</h5>';
        $o .= '  <div class="ts-row ts-row-small-gutters">';

        foreach ($books as $book) {
            $o .= '<div class="col-4">';
            $o .= '  <a href="' . $book->link . '">';
            $o .= '    <img src="' . $book->image_url . '" />';
            $o .= '  </a>';
            $o .= '</div>';
        }
        $o .= '  </div>';
        $o .= '</li>';
    }

    return $o;

}


function shortcodes_init()
{
    add_shortcode('books', 'books_widget_shortcode');
}

add_action('init', 'shortcodes_init');