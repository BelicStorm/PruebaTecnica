const SocketQueryModel = {
    CONNECT:"socketConnect",
    DISCONNECT:"socketDisconnect",

    EMIT:"emit",
    FIND_NEW_NEWS:"findNewNews",
    FIND_ARCHIVED:"findArchived",
    SET_ARTICLE_ARCHIVED:"archiveArticle",
    SET_ARTICLE_DELETED:"deleteArticle",

    LISTENER:"listener",
    ON_NEW_ARTICLE:"onNewArticle",
    ON_ARCHIVED:"onArchived",
    OFF_NEW_ARTICLE:"offNewArticle",
    OFF_ARCHIVED:"offArchived",
}
const SocketConsumerModel = {
    SOCKET_CONSUMER:"socketConsumer",
    CONNECT:"socketConnect",
    DISCONNECT:"socketDisconnect",
    EMIT:"emit",
    FIND_NEW_NEWS:"findNewNews",
    FIND_ARCHIVED:"findArchived",
    OFF_NEW_ARTICLE:"offNewArticle",
    OFF_ARCHIVED:"offArchived",
    SET_ARTICLE_ARCHIVED:"archiveArticle",
    SET_ARTICLE_DELETED:"deleteArticle",
}

export {SocketQueryModel,SocketConsumerModel}