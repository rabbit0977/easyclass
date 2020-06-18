$(function () {
    !function () {
        //获取含有ec属性的元素
        $('[ec]').each( (i,e) => {
            //获取属性值
            var ecValue = $(e).attr('ec').trim()
            if ( !ecValue || !ecValue.replace(/ /ig, '')) return
            //根据空格分隔值，获取值数组
            var ecValueArr = ecValue.split(/[ ]+/)
            //根据值设置css属性
            ecValueArr.forEach( val => {

                //判断是否是ec特殊属性(EC-  开头)
                if (val.startsWith('EC-'))
                {
                    dealECAttr(e, val)
                }
                else
                {
                    var kv = val.split(/_/)
                    if (kv.length != 2) throw 'ec属性格式有误: ' + val

                    //设置css属性
                    $(e).css(kv[0], kv[1])
                }
            })
        })
    }()

    //向页面插入style标签
    $('head').append(`
        <style>
            .clearfix::after {
                content: '';
                display: block;
                clear: both;
            }
            .oneLineTextOver {
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        </style>
    `)

    //处理EC属性
    function dealECAttr (e, val)
    {
        var val = val.substr(3)
        switch (val) {
            case 'clearfix':
            case 'oneLineTextOver':
                $(e).addClass(val)
                break
            case 'boxCenter':
                var parentPosition = $(e).parent().css('position')
                if (parentPosition === 'static')
                    $(e).parent().css('position', 'relative')

                $(e).css('position', 'absolute')
                $(e).css('top', '50%')
                $(e).css('left', '50%')
                $(e).css('transform', 'translate(-50%,-50%)')
                break
            case 'circle':
                $(e).css('border-radius', '50%')
                break
            default:
                otherDealECAttr(e, val)
        }
    }

    function otherDealECAttr (e, val)
    {
        var kv = val.split(/_/)
        if (kv.length <= 1) throw 'ec高级属性格式有误: ' + val
        switch (kv[0])
        {
            case 'circle':
                $(e).css('border-radius', '50%')
                if (kv[1])
                {
                    let size = isNaN(kv[1])?kv[1]:kv[1]+'px'
                    $(e).css('width', size)
                    $(e).css('height', size)
                }
                if (kv[2])
                    $(e).css('background-color', kv[2])
                else
                {
                    $(e).css('background-color', '#000')
                }
                break
            case 'triangle':
                //三角形大小
                let size = isNaN(kv[1])?kv[1]:kv[1]+'px'
                $(e).css('border-width', size)
                $(e).css('border-style', 'solid')
                $(e).css('width', 0)
                $(e).css('height', 0)
                $(e).css('border-color', 'transparent')
                //三角形位置与颜色
                if (kv[2])
                    $(e).css('border-'+kv[2]+'-color', kv[3]?kv[3]:'black')
                break

        }

    }

})



